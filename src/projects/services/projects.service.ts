import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from '../dto/project.dto';
import { UpdateProjectDto } from '../dto/project.dto';
import { Project } from '../entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TotalProjects } from '../entities/totalProjects.entity';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,

    @InjectRepository(TotalProjects)
    private totalProjectsRepository: Repository<TotalProjects>,
  ) { }

  async getAll(companyId: number) {
    const projects = await this.projectRepository
      .createQueryBuilder('p')
      .leftJoin(Project, 'parent', 'parent.id = p.parent_id')
      .addSelect('parent.name', 'parent_name')
      .addSelect(`
        CASE
          WHEN p.parent_id IS NULL THEN 0
          ELSE 1
        END`,
        'level')
      .where('p.company_id = :companyId', { companyId })
      .orderBy('COALESCE(p.parent_id, p.id)', 'ASC')
      .addOrderBy('p.parent_id', 'ASC', 'NULLS FIRST')
      .addOrderBy('p.id', 'ASC')
      .getRawMany();

    const mappedProjects = projects.map(p => ({
      id: p.p_id,
      type: p.p_type,
      name: p.p_name,
      description: p.p_description,
      startDate: p.p_start_date,
      endDate: p.p_end_date,
      status: p.p_status,
      parentId: p.p_parent_id,
      parentName: p.parent_name,
    }));

    return mappedProjects;

  }

  async getById(id: number) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async getByType(type: string, companyId: number) {
    // const projects = await this.projectRepository.find({ where: { type } });
    try {

      const where: any = type === 'ALL' ? ['project.company.id = :companyId', { companyId }]
        : ['project.type = :type AND project.company.id = :companyId', { type, companyId }]
      const projects = await this.projectRepository
        .createQueryBuilder('project')
        .select([
          'project.id AS "key"',
          'project.id AS "value"',
          'project.name AS "label"',
        ])
        // .where('project.type = :type AND project.company.id = :companyId', { type, companyId })
        .where(where[0], where[1])
        .getRawMany();
      if (!projects || projects.length === 0) throw new NotFoundException('No projects found for the specified type');
      return projects;
    } catch (error) {
      throw new BadRequestException(`Error in query projects ${error.message}`)
    }
  }

  async create(data: CreateProjectDto) {
    try {
      const newProject = this.projectRepository.create({
        ...data,
        company: { id: data.companyId },
      });
      const resp = await this.projectRepository.save(newProject);

      return resp;
    } catch (error) {
      throw new BadRequestException(`Error creating project ${error.message}`)
    }
  }

  async update(id: number, data: UpdateProjectDto) {
    try {
      const project = await this.getById(id);
      const updateProject = this.projectRepository.merge(project, data);
      return this.projectRepository.save(updateProject);
    } catch (error) {
      throw new BadRequestException(`Error updating the project ${error.message}`)
    }
  }

  async remove(id: number) {
    try {
      const project = await this.projectRepository.query(`select * from totals_incomes_expenses where project_id = $1 limit 1`, [id]);

      if (project.length > 0 && (Number(project[0].total_incomes) > 0 || Number(project[0].total_expenses) > 0)) {
        throw new ConflictException('Project not deleted because it has associated incomes or expenses');
      }
      const result = await this.projectRepository.delete(id);
      return { message: 'Project deleted successfully', deleted: true };

    } catch (error) {
      if (error instanceof ConflictException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error deleting project: ${error.message}`);
    }
  }

  async getTotals(companyId: number) {
    const totalProjects = await this.totalProjectsRepository.find({
      where: {
        company: { id: companyId },
      }
    });

    const totals = totalProjects.reduce((acc, totals) => {
      acc[totals.status] = totals.total;
      acc['TOTAL'] = (acc['TOTAL'] || 0) + totals.total;
      return acc;
    }, {} as Record<string, number>);

    return totals;

  }
}