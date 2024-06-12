/* eslint-disable prettier/prettier */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseData } from 'src/interface/response.intreface';

@Injectable()
export class BaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: ResponseData) => {
        const res = context.switchToHttp().getResponse();
        const { statusCode } = res;
        return this.success(response, statusCode);
      }),
      catchError((error: unknown) => {
        return throwError(() => error);
      }),
    );
  }

  success(response: ResponseData, statusCode: number) {
    return [{
      status_code: response?.status_code ?? statusCode,
      data: response.data ?? response,
      ...(response?.message && { message: response.message }),
      ...(response?.metadata && { metaresponse: response.metadata }),
    }];
  }
}
