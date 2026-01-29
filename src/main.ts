import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { ResponseInterceptor } from './shared/resource/response.interceptor';
import { API_PREFIX, APP_DESCRIPTION, APP_NAME, APP_VERSION } from './shared/resource/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  app.setGlobalPrefix(API_PREFIX);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion(APP_VERSION)
    .addTag('API')
    .build();

  const dcoument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, dcoument);

  app.use(cookieParser());
  app.enableCors({
    origin: ['https://app-project-tracking-production.up.railway.app'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
