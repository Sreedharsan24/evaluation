/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { createDetail } from './dto/create.dto';
import { createRepository } from './model-repository/details.repository';
import { BlobServiceClient } from '@azure/storage-blob';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();


@Injectable()
export class AppService {
  constructor(private readonly CreateRepository:createRepository) {}

  async detailCreate(
    details: createDetail, 
    profile: any
  ){
    try {
      console.log("profile2",profile)
      const user_id: any = await this.CreateRepository.findOneByFilter({userID: details.userID},{userID: 1});
      if(user_id === null) {
        if(profile.profile !== null && profile.profile !== undefined) {
          const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
          const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME);
          const blobName = details.userID;
          const blockBlobClient =containerClient.getBlockBlobClient(blobName);
          
          await blockBlobClient.upload(profile.profile[0].buffer, profile.profile[0].buffer.length);
          const blobUrl = blockBlobClient.url;
    
          const obj = {
            name: details.name,
            phone: details.phone,
            Address: details.Address,
            status: 'Active',
            profile: blobUrl,
            userID: details.userID, 
          }
  
          return await this.CreateRepository.createOne(obj);
        }
        else {
          console.log("dfghjk")
          const obj = {
            name: details.name,
            phone: details.phone,
            Address: details.Address,
            status: 'Active',
            profile: '',
            userID: details.userID, 
          }
          return await this.CreateRepository.createOne(obj);
        }
      } 
      else {
        return  {
          status_code: 202,
          data:  "UserID Already extists!"
        };
      }
    } catch (error) {
      return error;
    }
  }

  async getallUsers() {
    const GetClientQuery = {
      status: 'Active',
    };
    const attributes ={
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

  async getoneuser(id: string) {
    const attributes ={
      _id: 1,
      name: 1,
      phone: 1,
      Address: 1,
      profile: 1,
      userID: 1,
    };
    return this.CreateRepository.findOneById(id , attributes);
  }

  async updatedetails(
    details: createDetail,    
    profile: any,
    id: string,
  ) {
    try {
      console.log(profile)
        if(profile.profile !== null && profile.profile !== undefined) {
          const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
          const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME);
  
          const blobName = details.userID;
          const blockBlobClient =containerClient.getBlockBlobClient(blobName);
    
          await blockBlobClient.upload(profile.profile[0].buffer, profile.profile[0].buffer.length);
          const blobUrl = blockBlobClient.url;
  
          const obj = {
            name: details.name,
            phone: details.phone,
            Address: details.Address,
            status: 'Active',
            profile: blobUrl,
            userID: details.userID, 
          }
          return this.CreateRepository.findOneAndUpdate({_id:id}, obj);
  
        }
        else {
          const obj = {
            name: details.name,
            phone: details.phone,
            Address: details.Address,
            status: 'Active',
            userID: details.userID, 
          }
          return await this.CreateRepository.findOneAndUpdate({_id: id}, obj);
        }
    
      // else {
      //   return  {
      //     status_code: 202,
      //     data:  "UserID Already extists!"
      //   };
      // }
    } catch (error) {
      return error;
    }
  }

  async deleteprofile(id: string) {
    const query = {
      _id: id
    };
    return this.CreateRepository.findOneAndUpdate(query, {status: 'InActive'});
  }
}
