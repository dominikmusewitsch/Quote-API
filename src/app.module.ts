import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './quotes/entity/quote.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // <--- Specify your database type here
      database: 'database.sqlite', // <--- Path to your DB file (for SQLite) or database name

      entities: [Quote, User], // <--- **IMPORTANT:** This array will hold your Entity classes (e.g., [User, Product])
      //     You can also use a glob pattern like ['dist/**/*.entity{.ts,.js}']
      //     but explicitly listing them is often clearer for smaller projects.

      synchronize: true, // <--- **CAUTION: USE ONLY IN DEVELOPMENT!**
      //     This automatically creates/updates your database schema based on entities.
      //     **NEVER use in production** as it can lead to data loss.
      //     Use TypeORM Migrations for production schema changes.

      logging: false, // Set to 'all' or true to see SQL queries in the console (useful for debugging)
    }),
    QuotesModule,
    UsersModule, // Other modules will be imported here (e.g., UserModule)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
