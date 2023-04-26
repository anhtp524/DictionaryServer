import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { cacheModule } from 'src/Share/cache/cache.module';
import { jwtModule } from 'src/Share/jwt/jwt.module';
import { MailerModule } from 'src/Share/mailer/mailer.module';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { User, UserSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MailerModule,
        jwtModule,
        cacheModule,
    ],
    controllers: [UsersController],
    providers: [UsersService, UserRepository],
    exports: [UsersService, UserRepository],
})
export class UsersModule {}
