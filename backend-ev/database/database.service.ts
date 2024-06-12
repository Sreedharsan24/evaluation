/* eslint-disable prettier/prettier */
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { ObjectIdDocument } from 'src/models/common.schema';

export abstract class BaseService<TDocument extends ObjectIdDocument> {
    constructor(protected readonly model: Model<TDocument>) {}

  async createOne(document: any) {
    try {
      const createdDocument = new this.model({
        ...document,
        _id: new Types.ObjectId(),
      });
      return (await createdDocument.save()).toJSON() as TDocument;
    } catch (error: unknown) {
      return error;
    }
  }

  async findOneById(
    id: string,
    attributes?: Record<string, number>,
  ) {
    try {
      const data =  await this.model
        .findById(id)
        .select<Record<string, number>>(attributes)
        .lean<TDocument>(true);
      return [data]
    } catch (error: unknown) {
      return error;
    }
  }

  async findOneByFilter(
    filterQuery: FilterQuery<TDocument>,
    attributes?: FilterQuery<TDocument>,
  ) {
    try {
      return await this.model
        .findOne(filterQuery)
        .select<Record<string, number>>(attributes)
        .lean<TDocument>(true);
    } catch (error: unknown) {
      return error;
    }
  }

  async findManyByFilter(
    filterQuery: FilterQuery<TDocument>,
    attributes?: Record<string, number>,
  ) {
    try {
      const countFilterQuery = { ...filterQuery };

      const data = await this.model
        .find(countFilterQuery)
        .select(attributes)
        .collation({ locale: 'en_US', strength: 1 })
        .lean<TDocument[]>(true);

      return [data];
    } catch (error: unknown) {
      return error;
    }
  }

  async findOneAndUpdate(
    id: any,
    update: UpdateQuery<TDocument>,
    attributes?: Record<string, number>,
  ) {
    try {
      return await this.model
        .findByIdAndUpdate(id, update, { new: true })
        .select<Record<string, number>>(attributes)
        .lean<TDocument>(true);
    } catch (error: unknown) {
      return error;
    }
  }
}
