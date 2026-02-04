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

  async create(data: CreateExpenseDto, userId: number) {

    try {
      const newExpense = this.expensesRepository.create({
        ...data,
        userId: userId,
        project: { id: data.projectId }
      });
      return await this.expensesRepository.save(newExpense);
    } catch (error) {
      throw new BadRequestException(`Error creating expense: ${error.message}`);
    }
  }

  async findAll(companyId) {
    // return await this.expensesRepository.find();
    try {
      
      const data = await this.expensesRepository
      .createQueryBuilder('e')
      .leftJoin('concepts', 'c', 'c.id = e.concept')
      .leftJoin('projects', 'p', 'p.id = e.project_id')
      .select(['e.*', 'p.name as project_name', 'c.concept as concept_name'])
      .where('p.company_id = :companyId', { companyId })
      .orderBy('e.id', 'DESC')
      .getRawMany()

      return data;

    } catch (error) {
      throw new BadRequestException(`Error in query expenses ${error.message}`)
    }

  }

  async findOne(id: number) {
    const expense = await this.expensesRepository.findOneBy({ id });
    if (!expense) throw new BadRequestException(`Expense with id ${id} not found`)
    return expense;
  }

  async update(id: number, data: UpdateExpenseDto) {
    try {
      const {projectId, ...rest} = data;
      await this.expensesRepository.update(id,
        {
          ...rest,
          project: { id: projectId }
        });
      return await this.findOne(id);
    } catch (error) {
      throw new BadRequestException(`Error updating expense: ${error.message}`);
    }
  } 

  remove(id: number) {
    try {
      return this.expensesRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(`Error delete expense ${error.message}`)
      
    }
  }
}
