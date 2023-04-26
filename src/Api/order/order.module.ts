import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { cacheModule } from 'src/Share/cache/cache.module';
import { jwtModule } from 'src/Share/jwt/jwt.module';
import { OrderRepository } from './order.repository';
import { CoursesModule } from '../courses/courses.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
        cacheModule,
        jwtModule,
        CoursesModule,
    ],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository],
    exports: [OrderService],
})
export class OrderModule {}
