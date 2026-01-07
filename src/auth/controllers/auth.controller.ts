import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from 'src/company/entities/user.entity';
import { UserService } from 'src/company/services/user.services';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ) {
        const user = req.user as User;

        const accessToken = this.authService.generateJwt(user);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        return {
            user
        };
    }

    @Post('logout')
    async logout(
        @Res({ passthrough: true }) res: Response
    ) {
        res.clearCookie('access_token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });
        return {
            message: 'Logged out successfully'
        };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('validate-session')
    async validateSession(
        @Req() req: Request,
    ) {
        const { userId } = req.user as any;
        const user = await this.userService.findOne(userId);
        return {
            user
        };
    }


}