import { OmitType, PartialType } from "@nestjs/swagger";
import { IsDateString, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateIncomeDto {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    description: string;

    @IsDecimal()
    @IsNotEmpty()
    incomeValue: string;

    @IsDateString()
    @IsNotEmpty()
    incomeDate: Date;

    @IsString()
    @IsNotEmpty()
    paymentMethod: string;

    @IsString()
    @IsOptional()
    referenceNumber: string;
    
    @IsNumber()
    @IsNotEmpty()
    projectId: number;
}

export class UpdateIncomeDto extends PartialType(OmitType(CreateIncomeDto, ['projectId'])) { }

