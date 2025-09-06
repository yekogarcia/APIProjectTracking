import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UserService } from "../services/user.services";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async findAll() {
        return this.userService.findAll();
    }
    
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateUserDto) {
        return this.userService.create(payload);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUserDto) {
        return this.userService.update(id, payload);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id);
    }
}
