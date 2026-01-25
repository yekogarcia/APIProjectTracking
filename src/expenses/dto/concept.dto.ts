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
    @IsNotEmpty()
    @IsIn(['COSTO', 'GASTO'])
    typeExpense: string;
    
    @IsString()
    @IsOptional()
    @IsIn(['PROJECT', 'COMPANY'])
    view: string;
    
    @ValidateIf(o => o.view === 'PROJECT')
    @IsNumber()
    @IsNotEmpty()
    projectId: number;
}

export class UpdateConceptDto extends PartialType(CreateConceptDto) {}
