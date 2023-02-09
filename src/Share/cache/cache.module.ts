import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, CacheStore, Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import * as redisStore from 'cache-manager-ioredis';

@Module({
    imports: [
        ConfigModule,
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    store: redisStore ,
                    host: 'localhost',
                    port: configService.get<number>('CACHE_PORT'),
                }
            }
        }),
    ],
    providers: [CacheService],
    controllers: [],
    exports: [CacheService],
})
export class cacheModule {}