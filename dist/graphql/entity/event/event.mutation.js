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
exports.EventMutation = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const event_1 = require("@entity/event");
const apollo_server_errors_1 = require("apollo-server-errors");
let EventMutation = class EventMutation {
    repo = (0, typeorm_1.getRepository)(event_1.Event);
    async saveEvent(input) {
        let event = this.repo.create(input);
        return await this.repo.save(event);
    }
    async removeEvent(id) {
        const event = await this.repo.findOne(id);
        if (!event) {
            throw new apollo_server_errors_1.ApolloError('Entity ID Not Found', 'entity_id_not_found');
        }
        else {
            return this.repo.softRemove(event);
        }
    }
};
__decorate([
    (0, type_graphql_1.Mutation)((returns) => event_1.Event, { description: '儲存事件' }),
    __param(0, (0, type_graphql_1.Arg)('event')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.EventInput]),
    __metadata("design:returntype", Promise)
], EventMutation.prototype, "saveEvent", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => event_1.Event, { description: '刪除事件' }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventMutation.prototype, "removeEvent", null);
EventMutation = __decorate([
    (0, type_graphql_1.Resolver)()
], EventMutation);
exports.EventMutation = EventMutation;
