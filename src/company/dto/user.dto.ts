import { OmitType, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly role: string;

    @IsNotEmpty()
    @IsNumber()
    companyId: number;
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['companyId'])) {}