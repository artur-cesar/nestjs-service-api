import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

function enableSwagger(app: INestApplication<any>): void {
  const config = new DocumentBuilder()
    .setTitle('Pass Fight API')
    .setDescription('NestJS API with TypeORM')
    .setVersion('1.0')
    .addTag('fight')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

}

async function bootstrap(): Promise<undefined> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  enableSwagger(app);
  await app.listen(3000);
}
bootstrap();
