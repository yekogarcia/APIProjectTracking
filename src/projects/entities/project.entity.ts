import { Company } from "../../company/entities/company.entity";
import {
    Check, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { Expense } from "../../expenses/entities/expense.entity";
import { Income } from "../../incomes/entities/income.entity";
import { TotalsIncomesExpenses } from "./totalsIncomesExpenses.entity";

@Entity({ name: 'projects' })
@Check(`"status" IN ('ACTIVE', 'SUSPENDED', 'RUNNING', 'CANCELED', 'COMPLETED')`)
@Check(`"type" IN ('PROJECT', 'SUBPROJECT')`)
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20 })
    type: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'date', name: 'start_date' })
    startDate: string;

    @Column({ type: 'date', name: 'end_date', nullable: true })
    endDate: string;

    @Column({ type: 'varchar', length: 20 })
    status: string;

    @Column({ type: 'integer', name: 'parent_id', nullable: true })
    parentId: number;

    @Column({ type: 'integer', name: 'user_id' })
    userId: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Company , company => company.projects, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @OneToMany(() => Expense, (expense) => expense.project)
    expense: Expense[]

    @OneToMany(() => Income, (income) => income.project)
    income: Income[]

    @OneToMany(() => TotalsIncomesExpenses, (totalsIncomesExpenses) => totalsIncomesExpenses.project)
    totalsIncomesExpenses: TotalsIncomesExpenses[];
}
