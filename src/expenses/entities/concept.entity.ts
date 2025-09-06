import { Check, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'concepts'})
@Check(`"type_expense" IN ('COSTOS', 'GASTOS')`)
export class Concept {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100, nullable: false})
    concept: string;
    
    @Column({type: 'varchar', length: 255, nullable: false})
    description: string;

    @Column({type: 'varchar', length: 20, nullable: false})
    status: string;

    @Column({name: 'type_expense',type: 'varchar', length: 20, nullable: false})
    typeExpense: string;

    @Column({type: 'varchar', length: 20, nullable: false, default: 'ALL'})
    view: string;

    @Column({name: 'user_id',type: 'integer', nullable: false})
    userId: number;

    @Column({name: 'project_id',type: 'integer'})
    projectId: number;

    @Column({name: 'company_id',type: 'integer'})
    companyId: number;

    @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at'})
    updatedAt: Date;

}