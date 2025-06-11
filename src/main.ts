import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import ResponseFormatInterceptor from './common/interceptors/response.format.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 const swaggerConfig = new DocumentBuilder()
    .setTitle('DRS App')
    .setDescription('DRS App API')
    .setVersion('1.0')
    .addBearerAuth({
      type:"http",
      scheme:"bearer",
      bearerFormat:"JWT",
      name:"JWT",
      description:"Enter JWT token",
      in:"header"
    },"access-token")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/drs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseFormatInterceptor());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('envConfig.system.port') || 3000;

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();