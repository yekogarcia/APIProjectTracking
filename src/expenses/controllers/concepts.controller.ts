import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateConceptDto, UpdateConceptDto } from '../dto/concept.dto';
import { ConceptsService } from '../services/concepts.services';

@UseGuards(AuthGuard('jwt'))
@Controller('concepts')
export class ConceptsController {
    constructor(private readonly conceptsService: ConceptsService) { }

    @Post()
    create(@Req() req: Request, @Body() payload: CreateConceptDto) {
        const { userId, companyId } = (req as any).user;
        return this.conceptsService.create(payload, userId, companyId);
    }

    @Get()
    findAll() {
        return this.conceptsService.findAll();
    }

    @Get('/project/:id')
    findByProjectId(
        @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
        @Query('select') select: string
    ) {
        const { companyId } = (req as any).user
        return this.conceptsService.findByProjectId(id, companyId, select);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.conceptsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateConceptDto) {
        return this.conceptsService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.conceptsService.remove(id);
    }
}
