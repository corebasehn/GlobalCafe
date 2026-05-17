import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const status = 
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Mejorar la captura de mensajes para errores de validación (400 Bad Request)
    let message = exception.message || 'Error inesperado';
    
    if (status === HttpStatus.BAD_REQUEST && typeof exception.getResponse === 'function') {
      const responseBody = exception.getResponse();
      if (typeof responseBody === 'object' && responseBody !== null && responseBody.message) {
        // ValidationPipe suele devolver un array de strings en 'message'
        message = Array.isArray(responseBody.message) 
          ? responseBody.message.join(', ') 
          : responseBody.message;
      }
    }
    
    // Si el error viene de Prisma, solemos tener un 'code' (ej: P2002)
    const prismaCode = exception.code || null;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      prismaCode: prismaCode,
      message: message, // 👈 ESTO nos dirá qué falló exactamente
      stack: process.env.NODE_ENV !== 'production' ? exception.stack : null,
    });
  }
}