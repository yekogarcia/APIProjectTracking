import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards, Req, Put } from '@nestjs/common';
import { ExpensesService } from '../services/expenses.service';
import { CreateExpenseDto, UpdateExpenseDto } from '../dto/expense.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Req() req: Request, @Body() payload: CreateExpenseDto) {
    const { userId, companyId } = (req as any).user;
    return this.expensesService.create(payload, userId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const { companyId } = (req as any).user
    return this.expensesService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateExpenseDto) {
    return this.expensesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.remove(id);
  }
}
