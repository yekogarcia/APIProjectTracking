import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';

import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findAll() {
        try {
            return await this.userRepository.find()
        } catch (error) {
            throw new BadRequestException(`Error finding users ${error.message}`)
        }
    }

    async findOne(id: number) {
        const user =  await this.userRepository.findOneBy({ id })
        if(!user)throw new BadRequestException(`User with id ${id} not found`)
        return user;
    }
    
    async findByEmail(email: string) {
        const user =  await this.userRepository.findOneBy({ email })
        if(!user)throw new BadRequestException(`User with email ${email} not found`)
        return user;
    }

    async create(data: CreateUserDto) {
        try {
            const user = this.userRepository.create({
                ...data,
                company: { id: data.companyId }
            })
            const hashPassword = await bcrypt.hash(user.password, 10);
            user.password = hashPassword;
            return await this.userRepository.save(user)
        } catch (error) {
            throw new BadRequestException(`Error creating user ${error.message}`)
        }
    }
    
    async update(id: number, data: UpdateUserDto) {
        try {
            const user = await this.findOne(id);
            const updateUser = this.userRepository.merge(user, data);
            return await this.userRepository.save(updateUser)
        } catch (error) {
            throw new BadRequestException(`Error updating the user ${error.message}`)
        }
    }

    async delete(id: number) {
        try {
            await this.userRepository.delete(id)
            return {
                message: `User with id ${id} deleted`
            }
        } catch (error) {
            throw new BadRequestException(`Error deleting the user ${error.message}`)
        }
    }
}