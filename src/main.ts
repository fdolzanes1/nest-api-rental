import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET, PUT, POST, DELETE'],
  })
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
  app.setGlobalPrefix('api')
  const config = new DocumentBuilder()
    .setTitle('Rental API Documentation')
    .setDescription('The Rental API description')
    .setVersion('1.0')
    .addTag('rental')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('doc', app, document)
  await app.listen(3000)
}
bootstrap()
