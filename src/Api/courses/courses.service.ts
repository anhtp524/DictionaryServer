import { HttpException, Injectable } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import mongoose from 'mongoose';

@Injectable()
export class CoursesService {
    constructor(private readonly courserRepo: CoursesRepository) {}

    async createCourse(courseInfo: any) {
        if (courseInfo.startedTime >= courseInfo.endedTime) {
            throw new HttpException(`This course's started time is higher than ended time`, 400);
        }
        if (courseInfo.tuitionFee <= 0) {
            throw new HttpException(`Tuition fee is invalid`, 400);
        }
        const begin = new Date(courseInfo.startedTime);
        const end = new Date(courseInfo.endedTime);
        if (begin < new Date()) {
            throw new HttpException('Course start time is lower than date now', 400);
        }

        const checkCourse = await this.courserRepo.getOneByCondition({ courseName: courseInfo.courseName });
        if (checkCourse) {
            throw new HttpException('This course had been created', 400);
        }
        courseInfo.startedTime = new Date(begin.setHours(begin.getHours() + 7));
        courseInfo.endedTime = new Date(end.setHours(end.getHours() + 7));
        return this.courserRepo.create(courseInfo);
    }

    async getAllCourse(condition?) {
        return this.courserRepo.getAllByCondition(condition);
    }

    async getCourse(id: string) {
        const course = await this.courserRepo.getOneByCondition({ _id: new mongoose.Types.ObjectId(id) });
        if (!course) {
            throw new HttpException('Can not get this course', 400);
        }
        return course;
    }

    async updateCourse(id: string, updateAccount: any) {
        return await this.courserRepo.updateById(id, updateAccount);
    }
}
