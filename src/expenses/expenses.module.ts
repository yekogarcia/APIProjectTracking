import { Module } from '@nestjs/common';
import { ExpensesService } from './services/expenses.service';
import { ExpensesController } from './controllers/expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Concept } from './entities/concept.entity';
import { ConceptsService } from './services/concepts.services';
import { ConceptsController } from './controllers/concepts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, Concept])],
  controllers: [ExpensesController, ConceptsController],
  providers: [ExpensesService, ConceptsService],
})
export class ExpensesModule { }
