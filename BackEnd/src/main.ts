import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Configurar prefijo global '/api'
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  // --- CONFIGURACIÓN DE SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('PSS Global Café API')
    .setDescription('Sistema de Gestión de Recepciones y Control de Café')
    .setVersion('1.0')
    .addBearerAuth() // 🔑 Permite usar tokens JWT en la interfaz
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  // El segundo parámetro es la ruta: quedará en /api/docs
  SwaggerModule.setup('api/docs', app, document); 
  // --------------------------------

  // 2. Habilitar CORS
  app.enableCors({
    origin: true, // true permite el origen de la solicitud (útil para pruebas y despliegue inicial)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
  }
  bootstrap();