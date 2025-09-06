import { PartialType } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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

    @IsString()
    @IsNotEmpty()
    @IsIn(['ACTIVO', 'INACTIVO'])
    status: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    parentId: number;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) { }
