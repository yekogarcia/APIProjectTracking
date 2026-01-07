import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from '../dto/expense.dto';
import { UpdateExpenseDto } from '../dto/expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from '../entities/expense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
  ) { }

  async create(data: CreateExpenseDto) {
    try {
      const newExpense = this.expensesRepository.create({
        ...data,
        userId: 1,
        project: { id: data.projectId }
      });
      return await this.expensesRepository.save(newExpense);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.expensesRepository.find();
  }

  async findOne(id: number) {
    const expense = await this.expensesRepository.findOneBy({ id });
    if (!expense) throw new BadRequestException(`Expense with id ${id} not found`)
    return expense;
  }

  async update(id: number, data: UpdateExpenseDto) {
    try {
      await this.expensesRepository.update(id, data); 
      return await this.findOne(id);
    } catch (error) {
      throw new BadRequestException(`Error updating expense ${error.message}`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
