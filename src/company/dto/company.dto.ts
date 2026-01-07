import { IntersectionType, PartialType } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { createUserWithoutCompanyDto } from "./user.dto";

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(['COMPANY', 'PERSONAL'])
    type: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNumber()
    @IsNotEmpty()
    phone: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) { }

export class CompanyAndUserDto extends IntersectionType(
    CreateCompanyDto,
    createUserWithoutCompanyDto,
) { }