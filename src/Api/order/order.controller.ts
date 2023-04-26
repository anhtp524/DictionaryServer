import { Body, Controller, Post, Query, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Roles } from 'src/Share/guard/roles.decorator';
import { Role } from 'src/Share/enum/enum';
import { RolesGuard } from 'src/Share/guard/roles.guard';

@Controller()
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post('order')
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    async createCourse(@Request() request, @Query() body) {
        try {
            return await this.orderService.createOrder({
                userId: request.userId,
                courseIds: body.courseIds,
            });
        } catch (err) {
            console.log(err);

            throw err;
        }
    }
}
