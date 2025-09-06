import { Company } from "../../company/entities/company.entity";
import { Check, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany,
     PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Expense } from "../../expenses/entities/expense.entity";
import { Income } from "../../incomes/entities/income.entity";

@Entity({ name: 'projects' })
@Check(`"status" IN ('ACTIVO', 'INACTIVO')`)
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

    @ManyToOne(() => Company)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @OneToMany(() => Expense, expense => expense.id)
    expense: Expense[]

    @OneToMany(() => Income, income => income.id)
    income: Income[]
}
