import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from '../dto/project.dto';
import { UpdateProjectDto } from '../dto/project.dto';
import { Project } from '../entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    // return this.projectRepository.find();
    const projects = await this.projectRepository.createQueryBuilder('project')
      .leftJoin(
        Project, 'parent',
        'parent.id = project.parent_id',
      ).where('project.company_id = :companyId', { companyId }).
      addSelect([
        'parent.name AS parent_name',
      ]).
      getRawMany();

    const mappedProjects = projects.map(p => ({
      id: p.project_id,
      type: p.project_type,
      name: p.project_name,
      description: p.project_description,
      startDate: p.project_start_date,
      endDate: p.project_end_date,
      status: p.project_status,
      parentId: p.project_parent_id,
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
    return this.projectRepository.delete(id);
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