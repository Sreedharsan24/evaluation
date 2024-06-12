/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { details } from 'src/models/details.schema';
import { BaseService } from 'database/database.service';

@Injectable()
export class createRepository extends BaseService<details> {
  constructor(@InjectModel(details.name) detail_Model: Model<details>) {
    super(detail_Model);
  }
}
