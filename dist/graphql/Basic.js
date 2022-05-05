var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { InterfaceType, Field } from 'type-graphql';
let Basic = class Basic {
    id;
    createdAt;
    updatedAt;
    deleteAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    Field({ description: 'id' }),
    __metadata("design:type", Number)
], Basic.prototype, "id", void 0);
__decorate([
    CreateDateColumn({ type: 'datetime' }),
    Field({ description: 'Create Date Time' }),
    __metadata("design:type", Date)
], Basic.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ type: 'datetime' }),
    Field({ description: 'Update Date Time' }),
    __metadata("design:type", Date)
], Basic.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn({ type: 'datetime' }),
    Field({ description: 'Delete Date Time' }),
    __metadata("design:type", Date)
], Basic.prototype, "deleteAt", void 0);
Basic = __decorate([
    InterfaceType({ description: '基礎物件' })
], Basic);
export { Basic };
//# sourceMappingURL=Basic.js.map