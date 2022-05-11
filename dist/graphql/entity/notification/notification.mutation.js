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
exports.NotificationMutation = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const notification_1 = require("@entity/notification");
const apollo_server_errors_1 = require("apollo-server-errors");
let NotificationMutation = class NotificationMutation {
    repo = (0, typeorm_1.getRepository)(notification_1.Notification);
    async saveNotification(input) {
        let notif = this.repo.create(input);
        return await this.repo.save(notif);
    }
    async removeNotification(id) {
        const notif = await this.repo.findOne(id);
        if (!notif) {
            throw new apollo_server_errors_1.ApolloError('Entity ID Not Found', 'entity_id_not_found');
        }
        else {
            return this.repo.softRemove(notif);
        }
    }
};
__decorate([
    (0, type_graphql_1.Mutation)((returns) => notification_1.Notification, { description: '儲存通知' }),
    __param(0, (0, type_graphql_1.Arg)('notification')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_1.NotificationInput]),
    __metadata("design:returntype", Promise)
], NotificationMutation.prototype, "saveNotification", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => notification_1.Notification, { description: '刪除通知' }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationMutation.prototype, "removeNotification", null);
NotificationMutation = __decorate([
    (0, type_graphql_1.Resolver)()
], NotificationMutation);
exports.NotificationMutation = NotificationMutation;
