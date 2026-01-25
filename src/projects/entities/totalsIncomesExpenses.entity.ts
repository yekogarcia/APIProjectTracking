import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Index, Unique } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity({ name: 'totals_incomes_expenses' })
@Unique('IDX_totals_incomes_expenses_project_id', ['project'])
export class TotalsIncomesExpenses {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', precision: 14, scale: 2, name: 'total_incomes', default: 0 })
  totalIncomes: number;

  @Column({ type: 'numeric', precision: 14, scale: 2, name: 'total_expenses', default: 0 })
  totalExpenses: number;

  @OneToOne(() => Project, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' }) // 👈 crea la FK
  project: Project;
}
