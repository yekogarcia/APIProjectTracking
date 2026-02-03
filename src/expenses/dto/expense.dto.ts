import { OmitType, PartialType } from "@nestjs/swagger";
import { IsDateString, IsDecimal, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateExpenseDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(['COSTO', 'GASTO', 'ACTIVO'])
    typeExpense: string;

    @IsNumber()
    @IsNotEmpty()
    concept: number;

    @IsString()
    @IsOptional()
    expense: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['VARIABLE', 'FIJO'])
    type: string;
    
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    quantity: number;
    
    @IsDecimal()
    @IsNotEmpty()
    price: string;
    
    @IsDecimal()
    @IsNotEmpty()
    totalPrice: string;

    @IsDateString()
    @IsNotEmpty()
    expenseDate: string;

    @IsNumber()
    @IsNotEmpty()
    projectId: number;
}

// export class UpdateExpenseDto extends PartialType(OmitType(CreateExpenseDto, ['projectId'])) {}
export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}
