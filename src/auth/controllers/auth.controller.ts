import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/company/entities/user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req: Request) {
        const user = req.user as User;
        return {
            user,
            accessToken: this.authService.generateJwt(user)
        };
    }
}