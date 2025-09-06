import { OmitType, PartialType } from "@nestjs/swagger";
import { IsDecimal, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateExpenseDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(['COSTO', 'GASTO'])
    typeExpense: string;

    @IsNumber()
    @IsNotEmpty()
    concept: number;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['VARIABLE', 'NO VARIABLE'])
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

    @IsNumber()
    @IsNotEmpty()
    projectId: number;
}

export class UpdateExpenseDto extends PartialType(OmitType(CreateExpenseDto, ['projectId'])) {}
