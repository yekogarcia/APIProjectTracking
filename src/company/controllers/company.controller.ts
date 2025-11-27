import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDto, UpdateCompanyDto } from '../dto/company.dto';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { IS_PUBLIC_KEY, Public } from 'src/auth/decorators/public.decorator';

// @UseGuards(ApiKeyGuard)
// @SetMetadata('roles', ['admin'])
@Controller('company')
export class CompanyController {
  constructor(private readonly companysService: CompanyService) {}

  @Post()
  create(@Body() data: CreateCompanyDto) {
    return this.companysService.create(data);
  }

  // @SetMetadata('isPublic', true)
  @SetMetadata(IS_PUBLIC_KEY, true)
  @Get()
  findAll() {
    return this.companysService.findAll();
  }

  @Public()
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
