"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifTypeEnum = void 0;
const type_graphql_1 = require("type-graphql");
var NotifTypeEnum;
(function (NotifTypeEnum) {
    NotifTypeEnum["account_day"] = "account_day";
    NotifTypeEnum["payment_day"] = "payment_day";
    NotifTypeEnum["other"] = "other";
})(NotifTypeEnum = exports.NotifTypeEnum || (exports.NotifTypeEnum = {}));
(0, type_graphql_1.registerEnumType)(NotifTypeEnum, {
    name: 'NotifTypeEnum',
    description: '通知類型 enum'
});
