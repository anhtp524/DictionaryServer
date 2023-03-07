import { CacheService } from './../cache/cache.service';
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/enum';
import { jwtService } from '../jwt/jwt.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private JwtService: jwtService, private cacheService: CacheService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        try {
            const token = request.headers.authorization.replace('Bearer ', '');
            const userId = await this.JwtService.verifyToken(token);
            const userRole = await this.cacheService.get(`users:${userId.id}:accessToken`);
            if (!userRole) {
                throw new HttpException(
                    `You need to login`,
                    HttpStatus.NOT_ACCEPTABLE,
                );
            }
            request.userId = userId.id;
            request.userRole = userRole;
            if (roles.length > 0 && !roles.includes(userRole as Role)) {
                throw new HttpException(
                    `you are ${userRole} . You do not have permission to do this activity`,
                    HttpStatus.NOT_ACCEPTABLE,
                );
            }
            return true;
        } catch (err) {
            if (err instanceof HttpException && err.getStatus() === HttpStatus.NOT_ACCEPTABLE) {
                throw err;
            }
            throw new HttpException('Can not get the token or You have timed out for login', HttpStatus.BAD_REQUEST);
        }
    }
}