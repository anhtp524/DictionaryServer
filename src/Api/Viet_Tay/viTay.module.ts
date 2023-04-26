import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ElasticSearchModule } from 'src/Share/elasticsearch/elasticsearch.module';
import { TayModule } from '../Tay/tay.module';
import { VietModule } from '../Viet/viet.module';
import { VietTayController } from './viTay.controller';
import { viTayRepository } from './viTay.repository';
import { Viet_Tay, viTaySchema } from './viTay.schema';
import { viTayService } from './viTay.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Viet_Tay.name, schema: viTaySchema }]),
        ConfigModule,
        VietModule,
        TayModule,
        ElasticSearchModule,
    ],
    controllers: [VietTayController],
    providers: [viTayService, viTayRepository],
    exports: [viTayRepository],
})
export class VietTayModule {}
