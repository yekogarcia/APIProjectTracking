import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../dto/project.dto';
import { UpdateProjectDto } from '../dto/project.dto';
import { Project } from '../entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) { }

  async getAll() {
    return this.projectRepository.find();
  }

  async getById(id: number) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) throw new BadRequestException('Project not found');
    return project;
  }

  async create(data: CreateProjectDto) {
    try {
      const newProject = this.projectRepository.create({
        ...data,
        userId: 1,
        company: { id: 1 }
      });
      return this.projectRepository.save(newProject);
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

}
