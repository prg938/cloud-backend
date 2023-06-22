/* eslint-disable prettier/prettier */
import * as express from 'express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestFactory } from '@nestjs/core'
import { join } from 'path'
import { AppModule } from './app.module'

async function bootstrap() {
  const appOptions = {cors: false}
  const corsOptions = {
    credentials: true,
    origin: true
  }
  
  const app = await NestFactory.create(AppModule, appOptions)
  app.enableCors(corsOptions)
  app.use('/uploads', express.static(join(__dirname, '../', 'uploads')))

  const config = new DocumentBuilder()
    .setTitle('Nest Cloud')
    .setDescription('Nest Cloud service')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document, {swaggerOptions: {persistAuthorization: true}})

  await app.listen(7778)
  console.log('Listens on localhost:7778')
}
bootstrap()