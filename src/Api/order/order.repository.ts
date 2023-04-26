import { Repository } from 'src/Share/Database/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrderRepository extends Repository<OrderDocument> {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {
        super(orderModel);
    }
}
