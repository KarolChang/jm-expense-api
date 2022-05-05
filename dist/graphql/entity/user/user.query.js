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
import { getRepository } from 'typeorm';
import { Resolver, Query, Arg } from 'type-graphql';
import { User } from '@entity/user';
let UserQuery = class UserQuery {
    repo = getRepository(User).createQueryBuilder('User');
    async users() {
        return this.repo.getMany();
    }
    async userByEmail(email) {
        return this.repo.where('User.email = :email', { email }).getOneOrFail();
    }
    async user(id) {
        return this.repo.where('User.id = :id', { id }).getOneOrFail();
    }
};
__decorate([
    Query((returns) => [User], { description: '取得所有使用者' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserQuery.prototype, "users", null);
__decorate([
    Query((returns) => User, { description: '依Email取得使用者' }),
    __param(0, Arg('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserQuery.prototype, "userByEmail", null);
__decorate([
    Query((returns) => User, { description: '依ID取得使用者' }),
    __param(0, Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserQuery.prototype, "user", null);
UserQuery = __decorate([
    Resolver()
], UserQuery);
export { UserQuery };
//# sourceMappingURL=user.query.js.map