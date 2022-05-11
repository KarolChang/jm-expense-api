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
exports.BankInput = exports.Bank = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Basic_1 = require("@graphql/Basic");
const event_1 = require("@entity/event");
let Bank = class Bank extends Basic_1.Basic {
    name;
    code;
    events;
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)({ description: '名稱' }),
    __metadata("design:type", String)
], Bank.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)({ description: '代碼' }),
    __metadata("design:type", String)
], Bank.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => event_1.Event, (event) => event.bank),
    (0, type_graphql_1.Field)((type) => [event_1.Event], { description: '事件' }),
    __metadata("design:type", Array)
], Bank.prototype, "events", void 0);
Bank = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)({ description: '銀行機構', implements: Basic_1.Basic })
], Bank);
exports.Bank = Bank;
let BankInput = class BankInput {
    id;
};
__decorate([
    (0, type_graphql_1.Field)({ description: 'id' }),
    __metadata("design:type", Number)
], BankInput.prototype, "id", void 0);
BankInput = __decorate([
    (0, type_graphql_1.InputType)({ description: '銀行機構Input' })
], BankInput);
exports.BankInput = BankInput;
