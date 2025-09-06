import { PartialType } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateConceptDto {
    @IsNotEmpty()
    @IsString()
    concept: string;

    @IsString()
    @IsOptional()
    description: string;
    
    @IsString()
    @IsNotEmpty()
    @IsIn(['ACTIVO', 'INACTIVO'])
    status: string;
    
    @IsString()
    @IsNotEmpty()
    @IsIn(['COSTOS', 'GASTOS'])
    typeExpense: string;
    
    @IsString()
    @IsOptional()
    @IsIn(['PROJECT', 'COMPANY'])
    view: string;
    
    @IsNumber()
    @IsNotEmpty()
    projectId: number;
}

export class UpdateConceptDto extends PartialType(CreateConceptDto) {}
