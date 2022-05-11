"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventFieldResolver = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const user_1 = require("@entity/user");
const event_1 = require("@entity/event");
const bank_1 = require("@entity/bank");
const notification_1 = require("@entity/notification");
let EventFieldResolver = class EventFieldResolver {
    async user(root) {
        return await (0, typeorm_1.getRepository)(user_1.User)
            .createQueryBuilder('User')
            .leftJoin('User.events', 'events')
            .where('events.id = :eventId', { eventId: root.id })
            .getOne();
    }
    async bank(root) {
        return await (0, typeorm_1.getRepository)(bank_1.Bank)
            .createQueryBuilder('Bank')
            .leftJoin('Bank.events', 'events')
            .where('events.id = :eventId', { eventId: root.id })
            .getOne();
    }
    async notifications(root) {
        return await (0, typeorm_1.getRepository)(notification_1.Notification)
            .createQueryBuilder('Notification')
            .leftJoin('Notification.event', 'event')
            .andWhere('event.id = :eventId', { eventId: root.id })
            .getMany();
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)((type) => user_1.User),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.Event]),
    __metadata("design:returntype", Promise)
], EventFieldResolver.prototype, "user", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((type) => bank_1.Bank),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.Event]),
    __metadata("design:returntype", Promise)
], EventFieldResolver.prototype, "bank", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((type) => [notification_1.Notification]),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.Event]),
    __metadata("design:returntype", Promise)
], EventFieldResolver.prototype, "notifications", null);
EventFieldResolver = __decorate([
    (0, type_graphql_1.Resolver)((of) => event_1.Event)
], EventFieldResolver);
exports.EventFieldResolver = EventFieldResolver;
