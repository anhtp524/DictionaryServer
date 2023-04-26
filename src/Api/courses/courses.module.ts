import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CoursesRepository } from './courses.repository';
import { CourseSchema, Courses } from './courses.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { cacheModule } from 'src/Share/cache/cache.module';
import { jwtModule } from 'src/Share/jwt/jwt.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Courses.name, schema: CourseSchema }]), cacheModule, jwtModule],
    controllers: [CoursesController],
    providers: [CoursesService, CoursesRepository],
    exports: [CoursesService, CoursesRepository],
})
export class CoursesModule {}
