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
exports.UserInput = exports.User = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Basic_1 = require("@/graphql/Basic");
const event_1 = require("@entity/event");
let User = class User extends Basic_1.Basic {
    email;
    lineUserId;
    events;
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)({ description: 'Email' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)({ description: 'Line使用者ID' }),
    __metadata("design:type", String)
], User.prototype, "lineUserId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => event_1.Event, (event) => event.user),
    (0, type_graphql_1.Field)((type) => [event_1.Event], { description: '事件' }),
    __metadata("design:type", Array)
], User.prototype, "events", void 0);
User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)({ description: '使用者', implements: Basic_1.Basic })
], User);
exports.User = User;
let UserInput = class UserInput {
    id;
};
__decorate([
    (0, type_graphql_1.Field)({ description: 'id' }),
    __metadata("design:type", Number)
], UserInput.prototype, "id", void 0);
UserInput = __decorate([
    (0, type_graphql_1.InputType)({ description: '使用者Input' })
], UserInput);
exports.UserInput = UserInput;
