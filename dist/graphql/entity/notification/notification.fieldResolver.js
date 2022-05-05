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
import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Event } from '@entity/event';
import { Notification } from '@entity/notification';
let NotificationFieldResolver = class NotificationFieldResolver {
    async event(root) {
        return await getRepository(Event)
            .createQueryBuilder('Event')
            .leftJoin('Event.notifications', 'notifications')
            .where('notifications.id = :notificationId', { notificationId: root.id })
            .getOne();
    }
};
__decorate([
    FieldResolver(),
    __param(0, Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Notification]),
    __metadata("design:returntype", Promise)
], NotificationFieldResolver.prototype, "event", null);
NotificationFieldResolver = __decorate([
    Resolver((of) => Notification)
], NotificationFieldResolver);
export { NotificationFieldResolver };
//# sourceMappingURL=notification.fieldResolver.js.map