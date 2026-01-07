import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CompanyAndUserDto, CreateCompanyDto } from '../dto/company.dto';
import { UpdateCompanyDto } from '../dto/company.dto';
import { Company } from '../entities/company.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private dataSource: DataSource,

  ) { }

  async create(data: CreateCompanyDto) {
    try {

      const resp = await this.companyRepository.save(data);
      return resp;

    } catch (error) {
      throw new BadRequestException(`Error creating company ${error.message}`)
    }
  }

  async createCompanyAndUser(data: CompanyAndUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const companyData: CreateCompanyDto = {
        type: data.type,
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email,
      };

      const company = await queryRunner.manager.save(Company, companyData);

      const userData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: await bcrypt.hash(data.password, 10),
        role: 'ADMIN',
        company: company,
      };

      const user = await queryRunner.manager.save(User, userData);

      await queryRunner.commitTransaction();

      return { data: company, message: 'Company and user created successfully' };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(`Error creating company and user: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }


  findAll() {
    return this.companyRepository.find();
  }

  async findAllUsers(id: number) {
    const usersByCompany = await this.companyRepository.find({ where: { id }, relations: ['users'] });
    if (!usersByCompany) throw new BadRequestException(`Company with id ${id} not found`);
    return usersByCompany;
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) throw new BadRequestException(`Company with id ${id} not found`);
    return company;
  }

  async update(id: number, data: UpdateCompanyDto) {
    try {
      const company = await this.findOne(id);
      const updateCompany = this.companyRepository.merge(company, data);
      return await this.companyRepository.save(updateCompany)
    } catch (error) {
      throw new BadRequestException(`Error updating the company ${error.message}`)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
