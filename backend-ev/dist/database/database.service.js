"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const mongoose_1 = require("mongoose");
class BaseService {
    constructor(model) {
        this.model = model;
    }
    async createOne(document) {
        try {
            const createdDocument = new this.model({
                ...document,
                _id: new mongoose_1.Types.ObjectId(),
            });
            return (await createdDocument.save()).toJSON();
        }
        catch (error) {
            return error;
        }
    }
    async findOneById(id, attributes) {
        try {
            const data = await this.model
                .findById(id)
                .select(attributes)
                .lean(true);
            return [data];
        }
        catch (error) {
            return error;
        }
    }
    async findOneByFilter(filterQuery, attributes) {
        try {
            return await this.model
                .findOne(filterQuery)
                .select(attributes)
                .lean(true);
        }
        catch (error) {
            return error;
        }
    }
    async findManyByFilter(filterQuery, attributes) {
        try {
            const countFilterQuery = { ...filterQuery };
            const data = await this.model
                .find(countFilterQuery)
                .select(attributes)
                .collation({ locale: 'en_US', strength: 1 })
                .lean(true);
            return [data];
        }
        catch (error) {
            return error;
        }
    }
    async findOneAndUpdate(id, update, attributes) {
        try {
            return await this.model
                .findByIdAndUpdate(id, update, { new: true })
                .select(attributes)
                .lean(true);
        }
        catch (error) {
            return error;
        }
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=database.service.js.map