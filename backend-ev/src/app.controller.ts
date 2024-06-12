/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Patch, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ROUTES } from 'routes/route';
import { createDetail } from './dto/create.dto';
import { ParseUpdateDataInterceptor } from './Interceptor/filevalidation.interceptor';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller(ROUTES.BASEURL)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post(ROUTES.POST_DETAILS)
  @UseInterceptors(ParseUpdateDataInterceptor)
  @UseInterceptors(
    FileFieldsInterceptor([
      {name : 'profile', maxCount: 1}
    ])
  )
  async createDetail(
    @Body() Details: createDetail,
    @UploadedFiles() 
      profile ?: Express.Multer.File,
) {
  return this.appService.detailCreate(Details, profile);
  }

  @Get(ROUTES.GET_ALL_PROFILES)
  async getAllUsers() {
    return this.appService.getallUsers();
  }

  @Get(ROUTES.GET_ONE_USER)
  async getOneUser(
    @Query() query: any
  ) {
    const { id } = query;
    return this.appService.getoneuser(id);
  }

  @Post(ROUTES.UPDATE_DETAILS)
  @UseInterceptors(ParseUpdateDataInterceptor)
  @UseInterceptors(
    FileFieldsInterceptor([
      {name : 'profile', maxCount: 1}
    ])
  )
  async updateDetails(
    @Query() query: any,
    @Body() Details: createDetail,
    @UploadedFiles() 
      profile ?: Express.Multer.File,
  ) {
    const { id } = query;
    return this.appService.updatedetails(Details, profile, id);
  }

  @Patch(ROUTES.Delete_PROFILE)
  async deleteProfile(
    @Query() query : any
  ) {
    const { id } = query;
    return this.appService.deleteprofile(id);
  }
}
