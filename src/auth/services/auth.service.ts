import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from 'src/company/services/user.services';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/company/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Unauthorized');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Unauthorized');
        }
        return user;
    }

    generateJwt(user: User) {
        const payload = { sub: user.id};
        return this.jwtService.sign(payload);
    }

    // async validateApiKey(apiKey: string): Promise<boolean> {
    //     // const user = await this.userService.findByApiKey(apiKey);   
    //     // return !!user;
    // }
}
