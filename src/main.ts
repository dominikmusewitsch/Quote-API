import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // whitelist: true → nicht erlaubte Felder aus DTO werden ignoriert
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector))); // Inject Reflector manually
}
bootstrap();
