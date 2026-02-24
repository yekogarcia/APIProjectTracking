import { IntersectionType, PartialType } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { createUserWithoutCompanyDto, updateUserWithoutCompanyDto } from "./user.dto";

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

export class UpdateCompanyAndUserDto extends IntersectionType(
    PartialType(UpdateCompanyDto),
    updateUserWithoutCompanyDto,
) {
    @IsOptional()
    @IsNumber()
    userId: number;

    @IsOptional()
    @IsNumber()
    companyId: number;

    @IsOptional()
    @IsString()
    readonly password?: string;
}