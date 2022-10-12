import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TayModule } from '../Tay/tay.module';
import { VietModule } from '../Viet/viet.module';
import { VietTayController } from './viTay.controller';
import { viTayRepository } from './viTay.repository';
import { Viet_Tay, viTaySchema } from './viTay.schema';
import { viTayService } from './viTay.service';


@Module({
    imports: [
        MongooseModule.forFeature([{name: Viet_Tay.name, schema: viTaySchema}]),
        VietModule,
        TayModule
    ],
    controllers: [VietTayController],
    providers: [viTayService, viTayRepository],
})
export class VietTayModule {}
