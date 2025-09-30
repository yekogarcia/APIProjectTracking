import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        
        // console.log(response.statusCode);
        return next.handle().pipe(
            map((data) => {
                const statusCode = response.statusCode || HttpStatus.OK;
                const statusMessage = HttpStatus[statusCode] || 'OK';

                return {
                    statusCode,
                    statusMessage,
                    message: data?.message || 'Operation successful',
                    timestamp: new Date().toISOString(),
                    data: data?.data ?? data,
                };
            })
        );
    }

}