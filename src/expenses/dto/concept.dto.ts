import { PartialType } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";

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
    @IsOptional()
    @IsIn(['COSTO', 'GASTO', 'ACTIVO'])
    typeExpense: string;
    
    @IsString()
    @IsOptional()
    @IsIn(['PROJECT', 'SYSTEM'])
    view: string;
    
    @ValidateIf(o => o.view === 'PROJECT')
    @IsNumber()
    @IsNotEmpty()
    projectId: number;
}

export class UpdateConceptDto extends PartialType(CreateConceptDto) {}
