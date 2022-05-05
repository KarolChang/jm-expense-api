var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType, InputType } from 'type-graphql';
import { Basic } from '@graphql/Basic';
import { NotifTypeEnum } from '@graphql/enum';
import { Event } from '@entity/event';
let Notification = class Notification extends Basic {
    time;
    message;
    type;
    event;
};
__decorate([
    Column({ type: 'datetime' }),
    Field({ description: '通知時間' }),
    __metadata("design:type", Date)
], Notification.prototype, "time", void 0);
__decorate([
    Column(),
    Field({ description: '訊息' }),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    Column({ type: 'enum', enum: NotifTypeEnum }),
    Field({ description: '通知類型' }),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    ManyToOne((type) => Event, (event) => event.notifications),
    Field((type) => Event, { description: '事件' }),
    __metadata("design:type", Event)
], Notification.prototype, "event", void 0);
Notification = __decorate([
    Entity(),
    ObjectType({ description: '通知', implements: Basic })
], Notification);
export { Notification };
let NotificationInput = class NotificationInput {
    id;
    time;
    message;
    type;
};
__decorate([
    Field({ description: 'id' }),
    __metadata("design:type", Number)
], NotificationInput.prototype, "id", void 0);
__decorate([
    Field({ description: '通知時間' }),
    __metadata("design:type", Date)
], NotificationInput.prototype, "time", void 0);
__decorate([
    Field({ description: '訊息' }),
    __metadata("design:type", String)
], NotificationInput.prototype, "message", void 0);
__decorate([
    Field({ description: '通知類型' }),
    __metadata("design:type", String)
], NotificationInput.prototype, "type", void 0);
NotificationInput = __decorate([
    InputType({ description: '事件Input' })
], NotificationInput);
export { NotificationInput };
//# sourceMappingURL=notification.type.js.map