/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { ObjectIdDocument } from 'src/models/common.schema';
export declare abstract class BaseService<TDocument extends ObjectIdDocument> {
    protected readonly model: Model<TDocument>;
    constructor(model: Model<TDocument>);
    createOne(document: any): Promise<unknown>;
    findOneById(id: string, attributes?: Record<string, number>): Promise<unknown>;
    findOneByFilter(filterQuery: FilterQuery<TDocument>, attributes?: FilterQuery<TDocument>): Promise<unknown>;
    findManyByFilter(filterQuery: FilterQuery<TDocument>, attributes?: Record<string, number>): Promise<unknown>;
    findOneAndUpdate(id: any, update: UpdateQuery<TDocument>, attributes?: Record<string, number>): Promise<unknown>;
}
