import { Project } from "./project.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'totals_incomes_expenses' })
export class TotalsIncomesExpenses {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'numeric', precision: 14, scale: 2, name: 'total_incomes' })
    totalIncomes: number;

    @Column({ type: 'numeric', precision: 14, scale: 2, name: 'total_expenses' })
    totalExpenses: number;

    @ManyToOne(() => Project, (project) => project.totalsIncomesExpenses, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'project_id' })
    project: Project;
}
