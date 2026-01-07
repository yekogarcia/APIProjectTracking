import { Company } from "../../company/entities/company.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'total_projects' })
@Unique(['status', 'company'])
export class TotalProjects {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    status: string;

    @Column({ type: 'integer' })
    total: number;

    @ManyToOne(() => Company, company => company.totalProjects, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'company_id' })
    company: Company;
}