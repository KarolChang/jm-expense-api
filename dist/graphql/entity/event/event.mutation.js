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
import { Event, EventInput } from '@entity/event';
import { ApolloError } from 'apollo-server-errors';
let EventMutation = class EventMutation {
    repo = getRepository(Event);
    async saveEvent(input) {
        let event = this.repo.create(input);
        return await this.repo.save(event);
    }
    async removeEvent(id) {
        const event = await this.repo.findOne(id);
        if (!event) {
            throw new ApolloError('Entity ID Not Found', 'entity_id_not_found');
        }
        else {
            return this.repo.softRemove(event);
        }
    }
};
__decorate([
    Mutation((returns) => Event, { description: '儲存事件' }),
    __param(0, Arg('event')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EventInput]),
    __metadata("design:returntype", Promise)
], EventMutation.prototype, "saveEvent", null);
__decorate([
    Mutation((returns) => Event, { description: '刪除事件' }),
    __param(0, Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventMutation.prototype, "removeEvent", null);
EventMutation = __decorate([
    Resolver()
], EventMutation);
export { EventMutation };
//# sourceMappingURL=event.mutation.js.map