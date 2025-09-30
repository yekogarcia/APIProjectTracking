import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { IncomesService } from '../services/incomes.service';
import { CreateIncomeDto, UpdateIncomeDto } from '../dto/income.dto';

@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post()
  create(@Body() payload: CreateIncomeDto) {
    return this.incomesService.create(payload);
  }

  @Get()
  findAll() {
    throw new BadRequestException('Error al obtener los ingresos');
    return this.incomesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.incomesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateIncomeDto) {
    return this.incomesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.incomesService.remove(id);
  }
}
