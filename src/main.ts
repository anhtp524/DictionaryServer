import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './Share/exeptionFitler/exeption.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(8800);
}
bootstrap();
