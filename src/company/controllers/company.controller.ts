import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDto, UpdateCompanyDto } from '../dto/company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companysService: CompanyService) {}

  @Post()
  create(@Body() data: CreateCompanyDto) {
    return this.companysService.create(data);
  }

  @Get()
  findAll() {
    return this.companysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companysService.findOne(id);
  }

  @Get(':id/users')
  findUsers(@Param('id', ParseIntPipe) id: number) {
    return this.companysService.findAllUsers(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateCompanyDto) {
    return this.companysService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companysService.remove(id);
  }
}
