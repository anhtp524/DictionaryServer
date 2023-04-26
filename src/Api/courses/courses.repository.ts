import { Repository } from 'src/Share/Database/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Courses, CoursesDocument } from './courses.schema';

@Injectable()
export class CoursesRepository extends Repository<CoursesDocument> {
    constructor(@InjectModel(Courses.name) private courseModel: Model<CoursesDocument>) {
        super(courseModel);
    }
}
