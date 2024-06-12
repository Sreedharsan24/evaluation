/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        const uri = process.env.DB_CONNECTION_STRING;
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MongodbConfigModule {
  constructor() {
    mongoose.set('debug', true);

    // Add global mongoose error handling
    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected successfully');
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose connection disconnected');
    });
  }
}
