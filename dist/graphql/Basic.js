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
exports.Basic = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
let Basic = class Basic {
    id;
    createdAt;
    updatedAt;
    deleteAt;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, type_graphql_1.Field)({ description: 'id' }),
    __metadata("design:type", Number)
], Basic.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    (0, type_graphql_1.Field)({ description: 'Create Date Time' }),
    __metadata("design:type", Date)
], Basic.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime' }),
    (0, type_graphql_1.Field)({ description: 'Update Date Time' }),
    __metadata("design:type", Date)
], Basic.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'datetime' }),
    (0, type_graphql_1.Field)({ description: 'Delete Date Time' }),
    __metadata("design:type", Date)
], Basic.prototype, "deleteAt", void 0);
Basic = __decorate([
    (0, type_graphql_1.InterfaceType)({ description: '基礎物件' })
], Basic);
exports.Basic = Basic;
