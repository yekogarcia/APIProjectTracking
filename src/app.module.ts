
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
import config  from '../config';
import { GlobalModule } from './shared/global.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_CONNECTION: joi.string().default('postgres'),
        PORT: joi.number().default(3000),
      })
    }),
    GlobalModule,
    ProjectsModule,
    DatabaseModule,
    CompanyModule,
    ExpensesModule,
    IncomesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
