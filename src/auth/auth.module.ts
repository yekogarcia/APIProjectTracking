import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { CompanyModule } from 'src/company/company.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import config  from 'src/shared/resource/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        CompanyModule,
        PassportModule,
        // JwtModule.register({
        //     secret: 'secretKey',
        //     signOptions: { expiresIn: '6d' },
        //     // signOptions: { expiresIn: '60s' },
        // }),
        JwtModule.registerAsync({
            inject: [config.KEY],
            useFactory: () => ({
                secret: config().JWT_SECRET,
                signOptions: { expiresIn: config().JWT_EXPIRES_IN as any },
                algorithm: 'HS256'
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})

export class AuthModule { }
