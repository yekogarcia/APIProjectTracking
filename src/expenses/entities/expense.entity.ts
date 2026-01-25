import { Project } from "../../projects/entities/project.entity";
import { Check, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'expenses'})
@Check(`"type_expense" IN ('COSTO', 'GASTO')`)
export class Expense {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'type_expense',type: 'varchar', length: 20, nullable: false})
    typeExpense: string;
    
    @Column({type: 'integer', nullable: false})
    concept: number;

    @Column({type: 'varchar', length: 100, nullable: false})
    expense: string;
    
    @Column({type: 'varchar', length: 255, nullable: false})
    description: string;
    
    @Column({type: 'varchar', length: 20, nullable: false})
    type: string;
    
    @Column({type: 'integer', nullable: false})
    quantity: number;
    
    @Column({type: 'numeric', precision: 12, scale: 2, nullable: false})
    price: string;
    
    @Column({name: 'total_price', type: 'numeric',precision: 12, scale: 2, nullable: false})
    totalPrice: string;

    @Column({name: 'expense_date', type: 'date', nullable: false})
    expenseDate: Date;

    @Column({name:'user_id', type: 'integer', nullable: false})
    userId: number;

    @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => Project, project => project.expense, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'project_id'})
    project: Project;
}
