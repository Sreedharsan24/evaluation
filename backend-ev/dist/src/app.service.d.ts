import { createDetail } from './dto/create.dto';
import { createRepository } from './model-repository/details.repository';
export declare class AppService {
    private readonly CreateRepository;
    constructor(CreateRepository: createRepository);
    detailCreate(details: createDetail, profile: any): Promise<any>;
    getallUsers(): Promise<unknown>;
    getoneuser(id: string): Promise<unknown>;
    updatedetails(details: createDetail, profile: any, id: string): Promise<any>;
    deleteprofile(id: string): Promise<unknown>;
}
