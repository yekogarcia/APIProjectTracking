import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import { Project } from './entities/project.entity';
import { TotalProjects } from './entities/totalProjects.entity';
import { TotalsIncomesExpenses } from './entities/totalsIncomesExpenses.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      TotalsIncomesExpenses,
      TotalProjects,
      Project,
    ]
  )],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule { }
