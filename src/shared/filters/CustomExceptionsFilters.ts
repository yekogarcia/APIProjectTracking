import { ArgumentsHost, BadGatewayException, BadRequestException, Catch, ExceptionFilter, ForbiddenException, InternalServerErrorException, MethodNotAllowedException, NotAcceptableException, NotFoundException, ServiceUnavailableException, UnauthorizedException } from "@nestjs/common";


@Catch()
export class CustomExceptionsFilters implements ExceptionFilter {
    // constructor(private readonly message: string, private readonly status: number) { }

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest<Request>();

        if (exception instanceof BadRequestException) {
            this.templateException(response, exception, 'Error en la validación de datos')
        }
        if (exception instanceof InternalServerErrorException) {
            this.templateException(response, exception)
        }
        if (exception instanceof NotFoundException) {
            this.templateException(response, exception)
        }
        if (exception instanceof BadGatewayException) {
            this.templateException(response, exception)
        }
        if (exception instanceof ServiceUnavailableException) {
            this.templateException(response, exception)
        }
        if (exception instanceof MethodNotAllowedException) {
            this.templateException(response, exception)
        }
        if (exception instanceof UnauthorizedException) {
            this.templateException(response, exception)
        }
        if (exception instanceof NotAcceptableException) {
            this.templateException(response, exception)
        }
        if (exception instanceof ForbiddenException) {
            this.templateException(response, exception)
        }
    }

    templateException(response, exception, msg?) {
        const status = exception.getStatus();
        const error = exception.getResponse()['error'];
        let message = exception.getResponse()['message'];

        console.log(message);
        
        
        let data: any = {}
        if (Array.isArray(message)) {
            data = { errors: message }
            message = msg
        }
        return response.status(status).json({
            statusCode: status,
            statusMessage: error,
            message,
            timestamp: new Date(),
            data
        })
    }

}