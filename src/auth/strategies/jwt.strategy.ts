
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import config from 'src/shared/resource/config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(config.KEY) configService: ConfigType<typeof config>,
    ) {
        const secret = configService.JWT_SECRET || 'defaultSecretKey';
        if (!secret) {
            throw new Error('JWT_SECRET is not defined in configuration');
        }
        super({
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest: (req) => {
                return req.cookies?.accessToken;
            },
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    validate(payload: any) {
        return payload;
    }
}
