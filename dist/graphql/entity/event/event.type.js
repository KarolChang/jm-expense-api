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
exports.EventInput = exports.Event = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Basic_1 = require("@graphql/Basic");
const user_1 = require("@entity/user");
const notification_1 = require("@entity/notification");
const bank_1 = require("@entity/bank");
let Event = class Event extends Basic_1.Basic {
    // @Column()
    // @Field({ description: '銀行' })
    // bank: string
    // @ManyToOne((type) => Bank, (bank) => bank.events)
    bank;
    item;
    user;
    notifications;
};
__decorate([
    (0, typeorm_1.ManyToOne)((type) => bank_1.Bank),
    (0, type_graphql_1.Field)((type) => bank_1.Bank, { description: '銀行機構' }),
    __metadata("design:type", bank_1.Bank)
], Event.prototype, "bank", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)({ description: '商品' }),
    __metadata("design:type", String)
], Event.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_1.User, (user) => user.events),
    (0, type_graphql_1.Field)((type) => user_1.User, { description: '使用者' }),
    __metadata("design:type", user_1.User)
], Event.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => notification_1.Notification, (notif) => notif.event, { cascade: true }),
    (0, type_graphql_1.Field)((type) => [notification_1.Notification], { description: '通知' }),
    __metadata("design:type", Array)
], Event.prototype, "notifications", void 0);
Event = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)({ description: '事件', implements: Basic_1.Basic })
], Event);
exports.Event = Event;
let EventInput = class EventInput {
    id;
    bank;
    item;
    user;
    notifications;
};
__decorate([
    (0, type_graphql_1.Field)({ description: 'id' }),
    __metadata("design:type", Number)
], EventInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => bank_1.BankInput, { description: '銀行機構' }),
    __metadata("design:type", bank_1.Bank)
], EventInput.prototype, "bank", void 0);
__decorate([
    (0, type_graphql_1.Field)({ description: '商品' }),
    __metadata("design:type", String)
], EventInput.prototype, "item", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => user_1.UserInput, { description: '使用者' }),
    __metadata("design:type", user_1.User)
], EventInput.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => [notification_1.NotificationInput], { description: '通知' }),
    __metadata("design:type", Array)
], EventInput.prototype, "notifications", void 0);
EventInput = __decorate([
    (0, type_graphql_1.InputType)({ description: '事件Input' })
], EventInput);
exports.EventInput = EventInput;
