import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CompanyAndUserDto, CreateCompanyDto, UpdateCompanyAndUserDto } from '../dto/company.dto';
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

      return { data: company, message: 'Account and user created successfully' };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.code === '23505') {
        throw new ConflictException(`A user with the email ${data.email} already exists.`);
      }
      throw new BadRequestException(`Error creating company and user: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  async updateCompanyAndUser(data: UpdateCompanyAndUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find company and user first
      const company = await queryRunner.manager.findOne(Company, { where: { id: data.companyId } });
      if (!company) {
        throw new BadRequestException(`Company with id ${data.companyId} not found`);
      }

      const user = await queryRunner.manager.findOne(User, { where: { id: data.userId, company: { id: data.companyId } } });
      if (!user) {
        throw new BadRequestException(`User with id ${data.userId} not found in company ${data.companyId}`);
      }

      // Update company data if provided
      if (data.type || data.name || data.address || data.phone || data.email) {
        const companyData: Partial<Company> = {};
        if (data.type) companyData.type = data.type;
        if (data.name) companyData.name = data.name;
        if (data.address) companyData.address = data.address;
        if (data.phone) companyData.phone = data.phone;
        if (data.email) companyData.email = data.email;

        await queryRunner.manager.update(Company, data.companyId, companyData);
      }

      // Update user data if provided
      const userData: Partial<User> = {};
      if (data.name) userData.name = data.name;
      if (data.email) userData.email = data.email;
      if (data.phone) userData.phone = data.phone;
      if (data.role) userData.role = data.role;
      if (data.password) {
        userData.password = await bcrypt.hash(data.password, 10);
      }

      if (Object.keys(userData).length > 0) {
        await queryRunner.manager.update(User, data.userId, userData);
      }

      await queryRunner.commitTransaction();

      // Fetch updated data
      const updatedCompany = await queryRunner.manager.findOne(Company, { where: { id: data.companyId } });
      const updatedUser = await queryRunner.manager.findOne(User, { where: { id: data.userId } });
      
      const { password, ...userWithoutPassword } = updatedUser!;

      return {
        data: { ...userWithoutPassword, company: updatedCompany },
        message: 'Company and user updated successfully'
      };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.code === '23505') {
        throw new ConflictException(`A user with the email ${data.email} already exists.`);
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error updating company and user: ${error.message}`);
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
