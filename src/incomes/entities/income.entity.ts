import { Project } from "../../projects/entities/project.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'incomes'})
export class Income {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    type: string;
    
    @Column({type: 'varchar', length: 255})
    description: string;

    @Column({name: 'income_value',type: 'numeric', precision: 12, scale: 2})
    incomeValue: string;

    @Column({name: 'income_date', type: 'date'})
    incomeDate: Date;

    @Column({name: 'payment_method', type: 'varchar', length: 30})
    paymentMethod: string;

    @Column({name: 'reference_number', type: 'varchar', length: 30})
    referenceNumber: string;

    @Column({ type: 'integer', name: 'user_id' })
    userId: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Project, project => project.income, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'project_id' })
    project: Project
}
