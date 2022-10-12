import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VietController } from './viet.controller';
import { VietRepository } from './viet.repository';
import { Viet, VietSchema } from './viet.schema';
import { VietService } from './viet.service';


@Module({
    imports: [MongooseModule.forFeature([{name: Viet.name, schema: VietSchema}])],
    controllers: [VietController],
    providers: [VietService, VietRepository],
    exports: [VietRepository]
})
export class VietModule {}
