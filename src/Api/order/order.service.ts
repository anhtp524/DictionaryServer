import { HttpException, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import mongoose from 'mongoose';
import { CoursesRepository } from '../courses/courses.repository';
import { Status } from 'src/Share/enum/enum';

@Injectable()
export class OrderService {
    constructor(private readonly orderRepo: OrderRepository, private readonly courseRepo: CoursesRepository) {}

    async createOrder(orderInfo: any) {
        orderInfo.userId = new mongoose.Types.ObjectId(orderInfo.userId);
        const newOrder: any = {
            totalPayment: 0,
            userId: orderInfo.userId,
            courseId: orderInfo.courseIds,
        };
        const createOrder = await this.orderRepo.create(newOrder);
        orderInfo.courseIds.map(async (value) => {
            const course = await this.courseRepo.getOneByCondition({
                id: new mongoose.Types.ObjectId(value),
                status: Status.active,
            });
            if (!course) {
                await this.orderRepo.delete(createOrder._id);
                throw new HttpException(`This course id ${value} is invalid`, 400);
            }
            createOrder.totalPayment += course.tuitionFee;
            await createOrder.save();
        });
        return await createOrder.save();
    }
}
