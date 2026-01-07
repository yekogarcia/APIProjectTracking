import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Company } from "./company.entity";
import { Exclude } from "class-transformer";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    email: string;

    @Column({ type: 'bigint' })
    phone: number;

    @Exclude()
    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 50 })
    role: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt: Date;

    // @ManyToOne(() => Company, company => company.users, { eager: true })
    @ManyToOne(() => Company, (company) => company.users, {
        nullable: false,       // 🔥 clave para que NO permita null
        onDelete: 'CASCADE',  //RESTRICT o CASCADE si quieres borrar usuarios al borrar company
    })
    @JoinColumn({ name: 'company_id' })
    company: Company;
}