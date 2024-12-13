import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'randomString1234567890!@#',
        });
    }

    async validate(payload: any) {
        // Xác thực người dùng dựa vào payload của token
        return { userId: payload.sub, user: payload.username };
    }
}
