import { Controller, Post, UseGuards, Body, Get, Query, Param, Patch } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Roles } from 'src/Share/guard/roles.decorator';
import { Role, Status } from 'src/Share/enum/enum';
import { RolesGuard } from 'src/Share/guard/roles.guard';
import { CreateCourseDto } from './dto/course.dto';
import { CoursesDocument } from './courses.schema';

@Controller('')
export class CoursesController {
    constructor(private readonly courseService: CoursesService) {}

    @Post('courses')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    async createCourse(@Body() body: CreateCourseDto) {
        try {
            return await this.courseService.createCourse(body);
        } catch (err) {
            throw err;
        }
    }

    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    @Get('admin/courses')
    async getAllCourseForAdmin() {
        try {
            return await this.courseService.getAllCourse();
        } catch (err) {
            throw err;
        }
    }

    @Roles(Role.user)
    @UseGuards(RolesGuard)
    @Get('user/courses')
    async getAllCourseForUser() {
        try {
            return await this.courseService.getAllCourse({ status: Status.active });
        } catch (err) {
            throw err;
        }
    }

    @Get('courses/:id')
    @Roles(Role.admin, Role.user)
    @UseGuards(RolesGuard)
    async getCourseById(@Param('id') id: string): Promise<CoursesDocument> {
        try {
            return await this.courseService.getCourse(id);
        } catch (err) {
            throw err;
        }
    }
    @Patch('admin/courses/:id')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    async updateCourse(@Param('id') id: string, @Body() body: CreateCourseDto): Promise<CoursesDocument> {
        try {
            return await this.courseService.updateCourse(id, body);
        } catch (err) {
            throw err;
        }
    }

    @Patch('admin/courses/inactive/:id')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    async inactiveCourse(@Param('id') id: string): Promise<CoursesDocument> {
        try {
            return await this.courseService.updateCourse(id, { status: Status.inactive });
        } catch (err) {
            throw err;
        }
    }

    @Patch('admin/courses/active/:id')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    async activeCourse(@Param('id') id: string): Promise<CoursesDocument> {
        try {
            return await this.courseService.updateCourse(id, { status: Status.active });
        } catch (err) {
            throw err;
        }
    }
}
