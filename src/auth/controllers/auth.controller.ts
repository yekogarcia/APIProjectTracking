import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from 'src/company/entities/user.entity';
import { UserService } from 'src/company/services/user.services';
import config from 'src/shared/resource/config';
import { ConfigType } from '@nestjs/config';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        @Inject(config.KEY) private readonly appConfig: ConfigType<typeof config>
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
            httpOnly: this.appConfig.secureHttpOnly,
            secure: process.env.NODE_ENV === 'production',
            sameSite: this.appConfig.jwtSameSite as any,
            path: '/',
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
        res.clearCookie('accessToken', {
            httpOnly: this.appConfig.secureHttpOnly,
            sameSite: this.appConfig.jwtSameSite as any,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
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

    // @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('local'))
    @Post('validate-password')
    async validatePassword(@Req() req: Request) {
        
        const user = req.user as User;
        return user ? { valid: true } : { valid: false };
    }


}