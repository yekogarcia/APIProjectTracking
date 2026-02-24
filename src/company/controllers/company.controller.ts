import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CompanyAndUserDto, CreateCompanyDto, UpdateCompanyAndUserDto, UpdateCompanyDto } from '../dto/company.dto';
import { IS_PUBLIC_KEY, Public } from 'src/auth/decorators/public.decorator';

// @SetMetadata('roles', ['admin'])
@Controller('company')
export class CompanyController {
  constructor(private readonly companysService: CompanyService) {}

  @Post()
  create(@Body() data: CreateCompanyDto) {
    return this.companysService.create(data);
  }
  
  @Post('preregister')
  createCompanyAndUser(@Body() data: CompanyAndUserDto) {
    return this.companysService.createCompanyAndUser(data);
  }

  @Patch('profile')
  updateCompanyAndUser(
    @Body() data: UpdateCompanyAndUserDto
  ) {
    return this.companysService.updateCompanyAndUser(data);
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
