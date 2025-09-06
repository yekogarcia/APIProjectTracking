import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/company.dto';
import { UpdateCompanyDto } from '../dto/company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) { }

  async create(data: CreateCompanyDto) {
    try {
      return await this.companyRepository.save(data);
    } catch (error) {
      throw new BadRequestException(`Error creating company ${error.message}`)
    }
  }

  findAll() {
    return this.companyRepository.find();
  }

  async findAllUsers(id: number) {
    const usersByCompany =  await this.companyRepository.find({ where: {id}, relations: ['users']});
    if(!usersByCompany) throw new BadRequestException(`Company with id ${id} not found`);
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
