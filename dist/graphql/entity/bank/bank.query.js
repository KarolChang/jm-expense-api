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
exports.BankQuery = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const bank_1 = require("@entity/bank");
let BankQuery = class BankQuery {
    repo = (0, typeorm_1.getRepository)(bank_1.Bank).createQueryBuilder('Bank');
    async banks() {
        return this.repo.getMany();
    }
    async bank(id) {
        return this.repo.where('Bank.id = :id', { id }).getOneOrFail();
    }
    async bankByCode(code) {
        return this.repo.where('Bank.code = :code', { code }).getOneOrFail();
    }
};
__decorate([
    (0, type_graphql_1.Query)((returns) => [bank_1.Bank], { description: '依條件取得所有銀行機構' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BankQuery.prototype, "banks", null);
__decorate([
    (0, type_graphql_1.Query)((returns) => bank_1.Bank, { description: '依id取得銀行機構' }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BankQuery.prototype, "bank", null);
__decorate([
    (0, type_graphql_1.Query)((returns) => bank_1.Bank, { description: '依代碼(code)取得銀行機構' }),
    __param(0, (0, type_graphql_1.Arg)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BankQuery.prototype, "bankByCode", null);
BankQuery = __decorate([
    (0, type_graphql_1.Resolver)()
], BankQuery);
exports.BankQuery = BankQuery;
