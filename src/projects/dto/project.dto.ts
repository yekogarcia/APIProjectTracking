import { PartialType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDateString, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(['PROJECT', 'SUBPROJECT'])
    type: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsDateString()
    startDate: string;

    @Transform(({ value }) => value === '' ? undefined : value)
    @IsOptional()
    @IsDateString()
    endDate: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['ACTIVE', 'SUSPENDED', 'RUNNING', 'CANCELED', 'COMPLETED'])
    status: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    parentId: number;

    // @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    companyId: number;

    // @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    userId: number;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) { }
