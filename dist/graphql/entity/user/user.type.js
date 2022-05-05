var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, OneToMany } from 'typeorm';
import { Field, ObjectType, InputType } from 'type-graphql';
import { Basic } from '@/graphql/Basic';
import { Event } from '@entity/event';
let User = class User extends Basic {
    email;
    lineUserId;
    events;
};
__decorate([
    Column(),
    Field({ description: 'Email' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column(),
    Field({ description: 'Line使用者ID' }),
    __metadata("design:type", String)
], User.prototype, "lineUserId", void 0);
__decorate([
    OneToMany((type) => Event, (event) => event.user),
    Field((type) => [Event], { description: '事件' }),
    __metadata("design:type", Array)
], User.prototype, "events", void 0);
User = __decorate([
    Entity(),
    ObjectType({ description: '使用者', implements: Basic })
], User);
export { User };
let UserInput = class UserInput {
    id;
    email;
    lineUserId;
};
__decorate([
    Field({ description: 'id' }),
    __metadata("design:type", Number)
], UserInput.prototype, "id", void 0);
__decorate([
    Field({ description: 'Email' }),
    __metadata("design:type", String)
], UserInput.prototype, "email", void 0);
__decorate([
    Field({ description: 'Line使用者ID' }),
    __metadata("design:type", String)
], UserInput.prototype, "lineUserId", void 0);
UserInput = __decorate([
    InputType({ description: '使用者Input' })
], UserInput);
export { UserInput };
//# sourceMappingURL=user.type.js.map