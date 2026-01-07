import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, SetMetadata, UseGuards, Req } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDto } from '../dto/project.dto';
import { UpdateProjectDto } from '../dto/project.dto';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
@SetMetadata(IS_PUBLIC_KEY, false)
@UseGuards(AuthGuard('jwt'))
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  create(@Req() req: Request, @Body() payload: CreateProjectDto) {
    const { companyId, userId } = req.user as any;
    payload.companyId = companyId;
    payload.userId = userId;
    return this.projectsService.create(payload);
  }

  @Get()
  findAll(@Req() req: Request) {
    const { companyId } = req.user as any;
    return this.projectsService.getAll(companyId);
  }

  @Get('/totals')
  getTotals(@Req() req: Request) {
    const { companyId } = req.user as any;
    return this.projectsService.getTotals(companyId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.getById(id);
  }

  @Get('/type/:type')
  findByType(@Req() req: Request, @Param('type') type: string) {
    const { companyId } = req.user as any;
    return this.projectsService.getByType(type, companyId);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProjectDto) {
    return this.projectsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.remove(id);
  }

}
