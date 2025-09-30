import { ApiProperty } from "@nestjs/swagger";

export class ApiResponse {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    statusMessage: string;

    @ApiProperty()
    message: string;

    @ApiProperty()
    timestamp: Date;
    
    @ApiProperty()
    data: any;

    constructor(status: number, statusMessage: string, message: string, data: any) {
        this.statusCode = status;
        this.statusMessage = statusMessage;
        this.message = message;
        this.timestamp = new Date();
        this.data = data;
    }
}