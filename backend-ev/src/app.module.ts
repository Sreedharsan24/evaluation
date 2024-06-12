/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongodbConfigModule } from 'database/database.module';
import { createRepository } from './model-repository/details.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateSchema } from './models/details.schema';

@Module({
  imports: [MongodbConfigModule,
    MongooseModule.forFeature([
      {name: 'details', schema: CreateSchema}
    ])
  ],
  controllers: [AppController],
  providers: [AppService,createRepository],
})
export class AppModule {}
