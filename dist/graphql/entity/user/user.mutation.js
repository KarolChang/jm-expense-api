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
import { Resolver, Mutation, Arg } from 'type-graphql';
import { User, UserInput } from '@entity/user/user.type';
import { ApolloError } from 'apollo-server-errors';
let UserMutation = class UserMutation {
    repo = getRepository(User);
    async saveUser(input) {
        let user = this.repo.create(input);
        return await this.repo.save(user);
    }
    async removeUser(id) {
        const user = await this.repo.findOne(id);
        if (!user) {
            throw new ApolloError('Entity ID Not Found', 'entity_id_not_found');
        }
        else {
            return this.repo.softRemove(user);
        }
    }
};
__decorate([
    Mutation((returns) => User, { description: '儲存使用者' }),
    __param(0, Arg('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput]),
    __metadata("design:returntype", Promise)
], UserMutation.prototype, "saveUser", null);
__decorate([
    Mutation((returns) => User, { description: '刪除使用者' }),
    __param(0, Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserMutation.prototype, "removeUser", null);
UserMutation = __decorate([
    Resolver()
], UserMutation);
export { UserMutation };
//# sourceMappingURL=user.mutation.js.map