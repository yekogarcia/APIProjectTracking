import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateIncomeDto, UpdateIncomeDto } from '../dto/income.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from '../entities/income.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/shared/dto/apiResponse.dto';

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
      const resp = await this.incomeRepository.save(newIncome);
      return {
        message: 'Income created successfully',
        data: resp
      }
    } catch (error) {
      throw new BadRequestException(`Error creating Income`)
    }
  }

  async findAll() {
    return await this.incomeRepository.find();
  }

  async findOne(id: number) {
    const income = await this.incomeRepository.findOneBy({ id });
    if (!income) throw new NotFoundException(`Income with id ${id} not found`)
    return income;
  }

  async update(id: number, data: UpdateIncomeDto) {
    try {
      const resp = await this.incomeRepository.update(id, data);
      console.log(resp);

      return await this.findOne(id);
    } catch (error) {
      if (error.status === 404) throw new NotFoundException(`Income with id ${id} not found`)
      throw new InternalServerErrorException(`Error updating Income ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const resp = await this.incomeRepository.delete(id);
      if (resp.affected === 0) throw new NotFoundException(`User with id ${id} not found`)
      if (resp.affected === 1) {
        return {
          message: 'Deleted successfully',
          data: { id }
        }
      }
    } catch (error) {
      throw new BadRequestException(`Error deleting the user ${error.message}`)
    }
  }
}
