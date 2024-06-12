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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const details_repository_1 = require("./model-repository/details.repository");
const storage_blob_1 = require("@azure/storage-blob");
require('dotenv').config();
let AppService = class AppService {
    constructor(CreateRepository) {
        this.CreateRepository = CreateRepository;
    }
    async detailCreate(details, profile) {
        try {
            console.log("profile2", profile);
            const user_id = await this.CreateRepository.findOneByFilter({ userID: details.userID }, { userID: 1 });
            if (user_id === null) {
                if (profile.profile !== null && profile.profile !== undefined) {
                    const blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
                    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME);
                    const blobName = details.userID;
                    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    await blockBlobClient.upload(profile.profile[0].buffer, profile.profile[0].buffer.length);
                    const blobUrl = blockBlobClient.url;
                    const obj = {
                        name: details.name,
                        phone: details.phone,
                        Address: details.Address,
                        status: 'Active',
                        profile: blobUrl,
                        userID: details.userID,
                    };
                    return await this.CreateRepository.createOne(obj);
                }
                else {
                    console.log("dfghjk");
                    const obj = {
                        name: details.name,
                        phone: details.phone,
                        Address: details.Address,
                        status: 'Active',
                        profile: '',
                        userID: details.userID,
                    };
                    return await this.CreateRepository.createOne(obj);
                }
            }
            else {
                return {
                    status_code: 202,
                    data: "UserID Already extists!"
                };
            }
        }
        catch (error) {
            return error;
        }
    }
    async getallUsers() {
        const GetClientQuery = {
            status: 'Active',
        };
        const attributes = {
            _id: 1,
            name: 1,
            phone: 1,
            Address: 1,
            status: 1,
            profile: 1,
            userID: 1,
        };
        return this.CreateRepository.findManyByFilter(GetClientQuery, attributes);
    }
    async getoneuser(id) {
        const attributes = {
            _id: 1,
            name: 1,
            phone: 1,
            Address: 1,
            profile: 1,
            userID: 1,
        };
        return this.CreateRepository.findOneById(id, attributes);
    }
    async updatedetails(details, profile, id) {
        try {
            console.log(profile);
            if (profile.profile !== null && profile.profile !== undefined) {
                const blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
                const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME);
                const blobName = details.userID;
                const blockBlobClient = containerClient.getBlockBlobClient(blobName);
                await blockBlobClient.upload(profile.profile[0].buffer, profile.profile[0].buffer.length);
                const blobUrl = blockBlobClient.url;
                const obj = {
                    name: details.name,
                    phone: details.phone,
                    Address: details.Address,
                    status: 'Active',
                    profile: blobUrl,
                    userID: details.userID,
                };
                return this.CreateRepository.findOneAndUpdate({ _id: id }, obj);
            }
            else {
                const obj = {
                    name: details.name,
                    phone: details.phone,
                    Address: details.Address,
                    status: 'Active',
                    userID: details.userID,
                };
                return await this.CreateRepository.findOneAndUpdate({ _id: id }, obj);
            }
        }
        catch (error) {
            return error;
        }
    }
    async deleteprofile(id) {
        const query = {
            _id: id
        };
        return this.CreateRepository.findOneAndUpdate(query, { status: 'InActive' });
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [details_repository_1.createRepository])
], AppService);
//# sourceMappingURL=app.service.js.map