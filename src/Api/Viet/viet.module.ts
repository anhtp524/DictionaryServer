import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VietRepository } from './viet.repository';
import { Viet, VietSchema } from './viet.schema';
import { VietService } from './viet.service';


@Module({
    imports: [MongooseModule.forFeature([{name: Viet.name, schema: VietSchema}])],
    providers: [VietService, VietRepository],
    exports: [VietRepository]
})
export class VietModule {}
