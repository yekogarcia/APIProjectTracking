import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        
        return next.handle().pipe(
            map((data) => {
                // Extraer el statusCode personalizado si existe
                const customStatusCode = data?.statusCode;
                
                // Si hay un código personalizado, usarlo; de lo contrario, forzar 200
                const statusCode = customStatusCode || HttpStatus.OK;
                
                // Establecer el statusCode en la respuesta HTTP
                response.status(statusCode);
                
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