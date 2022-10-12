import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TayController } from './tay.controller';
import { TayRepository } from './tay.repository';
import { Tay, TaySchema } from './tay.schema';
import { TayService } from './tay.service';


@Module({
    imports: [MongooseModule.forFeature([{name: Tay.name, schema: TaySchema}])],
    controllers: [TayController],
    providers: [TayService, TayRepository],
    exports: [TayRepository]
})
export class TayModule {}
