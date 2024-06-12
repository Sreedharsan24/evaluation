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
exports.MongodbConfigModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const mongoose_2 = require("mongoose");
require('dotenv').config();
let MongodbConfigModule = class MongodbConfigModule {
    constructor() {
        mongoose_2.default.set('debug', true);
        mongoose_2.default.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });
        mongoose_2.default.connection.on('connected', () => {
            console.log('Mongoose connected successfully');
        });
        mongoose_2.default.connection.on('disconnected', () => {
            console.log('Mongoose connection disconnected');
        });
    }
};
exports.MongodbConfigModule = MongodbConfigModule;
exports.MongodbConfigModule = MongodbConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async () => {
                    const uri = process.env.DB_CONNECTION_STRING;
                    return {
                        uri,
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
    }),
    __metadata("design:paramtypes", [])
], MongodbConfigModule);
//# sourceMappingURL=database.module.js.map