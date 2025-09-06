import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateIncomeDto, UpdateIncomeDto } from '../dto/income.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from '../entities/income.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(Income)
    private incomeRepository: Repository<Income>,
  ) { }

  async create(data: CreateIncomeDto) {
    try {
      const newIncome = this.incomeRepository.create({
        ...data,
        userId: 1,
        projectId: { id: data.projectId }
      });
      return await this.incomeRepository.save(newIncome);
    } catch (error) {
      console.log(`Error creating Income ${error.message}`);
    }
  }

  async findAll() {
    return await this.incomeRepository.find();
  }

  async findOne(id: number) {
    const income = await this.incomeRepository.findOneBy({ id });
    if (!income) throw new Error(`Income with id ${id} not found`)
    return income;
  }

  async update(id: number, data: UpdateIncomeDto) {
    try {
      await this.incomeRepository.update(id, data);
      return await this.findOne(id);
    } catch (error) {
      console.log(error);
      throw new Error(`Error updating Income ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      await this.incomeRepository.delete(id);
      return {
        message: `User with id ${id} deleted`
      }
    } catch (error) {
      throw new BadRequestException(`Error deleting the user ${error.message}`)
    }
  }
}
