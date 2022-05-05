var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType, InputType } from 'type-graphql';
import { Basic } from '@graphql/Basic';
import { User, UserInput } from '@entity/user';
import { Notification } from '@entity/notification';
let Event = class Event extends Basic {
    bank;
    card;
    account_day;
    payment_day;
    user;
    notifications;
};
__decorate([
    Column(),
    Field({ description: '銀行' }),
    __metadata("design:type", String)
], Event.prototype, "bank", void 0);
__decorate([
    Column(),
    Field({ description: '卡名' }),
    __metadata("design:type", String)
], Event.prototype, "card", void 0);
__decorate([
    Column({ type: 'date', nullable: true }),
    Field({ description: '結帳日' }),
    __metadata("design:type", Date)
], Event.prototype, "account_day", void 0);
__decorate([
    Column({ type: 'date', nullable: true }),
    Field({ description: '繳費日' }),
    __metadata("design:type", Date)
], Event.prototype, "payment_day", void 0);
__decorate([
    ManyToOne((type) => User, (user) => user.events),
    Field((type) => User, { description: '使用者' }),
    __metadata("design:type", User)
], Event.prototype, "user", void 0);
__decorate([
    OneToMany((type) => Notification, (notif) => notif.event),
    Field((type) => [Notification], { description: '通知' }),
    __metadata("design:type", Array)
], Event.prototype, "notifications", void 0);
Event = __decorate([
    Entity(),
    ObjectType({ description: '事件', implements: Basic })
], Event);
export { Event };
let EventInput = class EventInput {
    id;
    bank;
    card;
    account_day;
    payment_day;
    user;
};
__decorate([
    Field({ description: 'id' }),
    __metadata("design:type", Number)
], EventInput.prototype, "id", void 0);
__decorate([
    Field({ description: '銀行' }),
    __metadata("design:type", String)
], EventInput.prototype, "bank", void 0);
__decorate([
    Field({ description: '卡名' }),
    __metadata("design:type", String)
], EventInput.prototype, "card", void 0);
__decorate([
    Field({ description: '結帳日' }),
    __metadata("design:type", Date)
], EventInput.prototype, "account_day", void 0);
__decorate([
    Field({ description: '繳費日' }),
    __metadata("design:type", Date)
], EventInput.prototype, "payment_day", void 0);
__decorate([
    Field((type) => UserInput, { description: '使用者' }),
    __metadata("design:type", User)
], EventInput.prototype, "user", void 0);
EventInput = __decorate([
    InputType({ description: '事件Input' })
], EventInput);
export { EventInput };
//# sourceMappingURL=event.type.js.map