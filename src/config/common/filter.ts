import { ExceptionFilter, Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    // const status = exception.getStatus();
    const message = exception.message;

    return {
      status: 'error',
      message: message,
      data: null,
    };
  }
}
