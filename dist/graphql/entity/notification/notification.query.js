var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { getRepository } from 'typeorm';
import { Resolver, Query, Arg } from 'type-graphql';
import { Notification } from '@entity/notification';
let NotificationQuery = class NotificationQuery {
    repo = getRepository(Notification).createQueryBuilder('Notification');
    async notifications(eventId, userId) {
        const query = this.repo.leftJoin('Notification.events', 'events').leftJoin('events.user', 'user');
        if (eventId) {
            query.andWhere('events.id = :eventId', { eventId });
        }
        if (userId) {
            query.andWhere('user.id = :userId', { userId });
        }
        return query.getMany();
    }
    async notification(id) {
        return this.repo.where('Notification.id = :id', { id }).getOneOrFail();
    }
};
__decorate([
    Query((returns) => [Notification], { description: '依條件取得通知' }),
    __param(0, Arg('eventId')),
    __param(1, Arg('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], NotificationQuery.prototype, "notifications", null);
__decorate([
    Query((returns) => Notification, { description: '依ID取得通知' }),
    __param(0, Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationQuery.prototype, "notification", null);
NotificationQuery = __decorate([
    Resolver()
], NotificationQuery);
export { NotificationQuery };
//# sourceMappingURL=notification.query.js.map