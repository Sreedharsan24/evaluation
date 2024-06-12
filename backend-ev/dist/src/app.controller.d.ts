/// <reference types="multer" />
import { AppService } from './app.service';
import { createDetail } from './dto/create.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    createDetail(Details: createDetail, profile?: Express.Multer.File): Promise<any>;
    getAllUsers(): Promise<unknown>;
    getOneUser(query: any): Promise<unknown>;
    updateDetails(query: any, Details: createDetail, profile?: Express.Multer.File): Promise<any>;
    deleteProfile(query: any): Promise<unknown>;
}
