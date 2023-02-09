import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheService } from 'src/Share/cache/cache.service';
import { comparePassword, hashPassword } from 'src/Share/encrypt/encrypt';
import { Status } from 'src/Share/enum/enum';
import { ERROR } from 'src/Share/errorHandling/error.handling';
import { jwtService } from 'src/Share/jwt/jwt.service';
import { UserRepository } from '../users/users.repository';
import { User } from '../users/users.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
        private readonly userRepository: UserRepository,
        private readonly jwtService: jwtService,
        private readonly cacheService: CacheService,
        private readonly configService: ConfigService) { }

    async register(user: any): Promise<User> {
        return this.userService.createUser(user);
    }

    async login(info: any) {
        const user = await this.userRepository.getOneByCondition({ 'username': info.username });  
        if (!user || !await comparePassword(info.password, user.password)) {
            throw new HttpException(ERROR.USERNAME_OR_PASSWORD_INCORRECT.message, ERROR.USERNAME_OR_PASSWORD_INCORRECT.statusCode)
        }
        if (user.status !== Status.active) {
            throw new HttpException(ERROR.USER_NOT_FOUND.message, ERROR.USER_NOT_FOUND.statusCode)
        }
        const refreshToken = await this.cacheService.get(`users:${user.id}:refreshToken`)
        const accessToken_old = await this.cacheService.get(`users:${user.id}:accessToken`)
        if (accessToken_old) {
                this.cacheService.del(`users:${user.id}:accessToken`);
        }
        const accessToken = await this.jwtService.signToken(
            { id: user.id },
            {
                expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
            },
        );
        if (refreshToken) {
            await this.cacheService.set(
                `users:${user.id}:accessToken`,
                user.role,
                this.configService.get<number>('CACHE_ACCESS_TOKEN_TTL'),
            );
            return {
                'accessToken': accessToken,
                'refreshToken': refreshToken,
            };
        }

        const newRefreshToken = await this.jwtService.signToken(
            { id: user.id },
            {
                expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
            },
        );
        await this.cacheService.set(
            `users:${user.id}:refreshToken`,
            newRefreshToken,
            this.configService.get<number>('CACHE_REFRESH_TOKEN_TTL'),
        );
        await this.cacheService.set(
            `users:${user.id}:accessToken`,
            user.role,
            this.configService.get<number>('CACHE_ACCESS_TOKEN_TTL'),
        );
        return {
            'accessToken': accessToken,
            'refreshToken': newRefreshToken,
        };
        
    }

    
}
