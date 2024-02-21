import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import 'dotenv/config'

import { AppModule } from './app.module'

import { PrismaClientExceptionFilter } from './shared/modules/persistence/prisma-client-exception/prisma-client-exception.filter'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: false }
  )

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  const port = process.env.PORT ?? 3001

  await app.listen(port, '0.0.0.0')

  // const url = await app.getUrl() // Obter a URL na qual o servidor está rodando

  // logger.log({ message: `Application running on ${url}` })

  console.log('Application Running 🔥')
}

bootstrap()
