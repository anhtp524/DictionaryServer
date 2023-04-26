import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { cacheModule } from 'src/Share/cache/cache.module';
import { jwtModule } from 'src/Share/jwt/jwt.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [UsersModule, jwtModule, cacheModule, ConfigModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
