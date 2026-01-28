import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, BadRequestException, UseGuards, Req, Put } from '@nestjs/common';
import { IncomesService } from '../services/incomes.service';
import { CreateIncomeDto, UpdateIncomeDto } from '../dto/income.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post()
  create(@Body() payload: CreateIncomeDto) {
    return this.incomesService.create(payload);
  }

  @Get()
  findAll(@Req() req: Request) {
    const { companyId } = (req as any).user
    return this.incomesService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.incomesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateIncomeDto) {
    return this.incomesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.incomesService.remove(id);
  }
}
