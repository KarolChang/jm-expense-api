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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationInput = exports.Notification = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Basic_1 = require("@graphql/Basic");
const enum_1 = require("@graphql/enum");
const event_1 = require("@entity/event");
let Notification = class Notification extends Basic_1.Basic {
    type;
    happened_time;
    notif_time;
    message;
    event;
};
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enum_1.NotifTypeEnum }),
    (0, type_graphql_1.Field)({ description: '通知類型' }),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    (0, type_graphql_1.Field)({ description: '發生時間' }),
    __metadata("design:type", Date)
], Notification.prototype, "happened_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    (0, type_graphql_1.Field)({ description: '通知時間' }),
    __metadata("design:type", Date)
], Notification.prototype, "notif_time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)({ description: '訊息' }),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => event_1.Event, (event) => event.notifications),
    (0, type_graphql_1.Field)((type) => event_1.Event, { description: '事件' }),
    __metadata("design:type", event_1.Event)
], Notification.prototype, "event", void 0);
Notification = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)({ description: '通知', implements: Basic_1.Basic })
], Notification);
exports.Notification = Notification;
let NotificationInput = class NotificationInput {
    type;
    happened_time;
    notif_time;
    message;
};
__decorate([
    (0, type_graphql_1.Field)({ description: '通知類型' }),
    __metadata("design:type", String)
], NotificationInput.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)({ description: '發生時間' }),
    __metadata("design:type", Date)
], NotificationInput.prototype, "happened_time", void 0);
__decorate([
    (0, type_graphql_1.Field)({ description: '通知時間' }),
    __metadata("design:type", Date)
], NotificationInput.prototype, "notif_time", void 0);
__decorate([
    (0, type_graphql_1.Field)({ description: '訊息' }),
    __metadata("design:type", String)
], NotificationInput.prototype, "message", void 0);
NotificationInput = __decorate([
    (0, type_graphql_1.InputType)({ description: '事件Input' })
], NotificationInput);
exports.NotificationInput = NotificationInput;
