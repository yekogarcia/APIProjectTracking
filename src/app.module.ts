
import * as joi from 'joi';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { ExpensesModule } from './expenses/expenses.module';
import { IncomesModule } from './incomes/incomes.module';
import { GlobalModule } from './shared/global.module';
import { AuthService } from './auth/services/auth.service';
import { AuthController } from './auth/controllers/auth.controller';
import { AuthModule } from './auth/auth.module';
import config from './shared/resource/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_CONNECTION: joi.string().default('postgres'),
        PORT: joi.number().default(3000),
        API_KEY: joi.string().required(),
      })
    }),
    GlobalModule,
    ProjectsModule,
    DatabaseModule,
    CompanyModule,
    ExpensesModule,
    IncomesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
