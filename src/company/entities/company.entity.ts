import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Project } from "../../projects/entities/project.entity";

@Entity({ name: 'companys' })
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    type: string;
    
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;
    
    @Column({ type: 'varchar', length: 255 })
    address: string;
    
    @Column({ type: 'bigint', nullable: false })
    phone: number;
    
    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    email: string;

    @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP',name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP',name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => User, user => user.company)
    users: User[]

    @OneToMany(() => Project, project => project.company)
    projects: Project[]
}
