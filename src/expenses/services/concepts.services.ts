import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concept } from '../entities/concept.entity';
import { CreateConceptDto, UpdateConceptDto } from '../dto/concept.dto';

@Injectable()
export class ConceptsService {
    constructor(
        @InjectRepository(Concept)
        private conceptsRepository: Repository<Concept>,
    ) { }

    async create(data: CreateConceptDto, userId: number, companyId: number) {
        try {
            const newConcept = this.conceptsRepository.create({
                ...data,
                userId,
                companyId,
            });
            return await this.conceptsRepository.save(newConcept);
        } catch (error) {
            throw new BadRequestException(`Error creating concept: ${error.message}`);
        }
    }

    async findAll(companyId: number) {
        // return await this.conceptsRepository.find();
        try {
            const concepts = await this.conceptsRepository
                .createQueryBuilder('c')
                .leftJoin('projects', 'p', 'p.id = c.project_id')
                .select(['c.*', 'p.name as project_name'])
                .where('c.company_id = :companyId', { companyId })
                .getRawMany();

            return concepts;
        } catch (error) {
            throw new BadRequestException(`Error fetching concepts: ${error.message}`);
        }
    }

    async findOne(id: number) {
        const concept = await this.conceptsRepository.findOneBy({ id });
        if (!concept) throw new BadRequestException(`Concept with id ${id} not found`)
        return concept;
    }

    async findByProjectId(id: number, companyId: number, select?: string) {

        try {
            const projects = await this.conceptsRepository
                .createQueryBuilder('concept')
                .select([
                    'concept.id AS "key"',
                    'concept.id AS "value"',
                    'concept.concept AS "label"',
                ])
                .where('(concept.project_id = :id OR concept.project_id is null) and concept.company_id = :companyId', { id, companyId })
                .getRawMany();


            if (!projects || projects.length === 0) throw new NotFoundException('No concepts found for the specified project or company, create a new concept');
            return projects;
        } catch (error) {
            throw new BadRequestException(`Error fetching concepts by project id: ${error.message}`);
        }
    }

    async update(id: number, data: UpdateConceptDto) {
        try {
            await this.conceptsRepository.update(id, data);
            return await this.findOne(id);
        } catch (error) {
            throw new BadRequestException(`Error updating concept ${error.message}`);
        }
    }

    async remove(id: number) {
        try {
            const concept = await this.conceptsRepository.query(`select id from expenses where concept = $1 limit 1`, [id]);
            if (concept && concept.length > 0) {
                throw new ConflictException('Concept not deleted because it is associated with existing expenses');
            }
            return this.conceptsRepository.delete(id);
        } catch (error) {
            throw new HttpException({ message: error.message }, error.status ? error.status : 500);
        }
    }
}
