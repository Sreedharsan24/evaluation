import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResponseData } from 'src/interface/response.intreface';
export declare class BaseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    success(response: ResponseData, statusCode: number): {
        metaresponse: any;
        message: string;
        status_code: number;
        data: any;
    }[];
}
