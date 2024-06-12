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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const route_1 = require("../routes/route");
const create_dto_1 = require("./dto/create.dto");
const filevalidation_interceptor_1 = require("./Interceptor/filevalidation.interceptor");
const platform_express_1 = require("@nestjs/platform-express");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async createDetail(Details, profile) {
        return this.appService.detailCreate(Details, profile);
    }
    async getAllUsers() {
        return this.appService.getallUsers();
    }
    async getOneUser(query) {
        const { id } = query;
        return this.appService.getoneuser(id);
    }
    async updateDetails(query, Details, profile) {
        const { id } = query;
        return this.appService.updatedetails(Details, profile, id);
    }
    async deleteProfile(query) {
        const { id } = query;
        return this.appService.deleteprofile(id);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)(route_1.ROUTES.POST_DETAILS),
    (0, common_1.UseInterceptors)(filevalidation_interceptor_1.ParseUpdateDataInterceptor),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'profile', maxCount: 1 }
    ])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.createDetail, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createDetail", null);
__decorate([
    (0, common_1.Get)(route_1.ROUTES.GET_ALL_PROFILES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)(route_1.ROUTES.GET_ONE_USER),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getOneUser", null);
__decorate([
    (0, common_1.Post)(route_1.ROUTES.UPDATE_DETAILS),
    (0, common_1.UseInterceptors)(filevalidation_interceptor_1.ParseUpdateDataInterceptor),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'profile', maxCount: 1 }
    ])),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_dto_1.createDetail, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateDetails", null);
__decorate([
    (0, common_1.Patch)(route_1.ROUTES.Delete_PROFILE),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteProfile", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(route_1.ROUTES.BASEURL),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map