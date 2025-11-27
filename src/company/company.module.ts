import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.services';
import { User } from './entities/user.entity';
import { Company } from './entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, User])],
  controllers: [CompanyController, UserController],
  providers: [CompanyService, UserService],
  exports: [CompanyService, UserService],
})
export class CompanyModule {}