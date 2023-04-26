import { HttpException } from '@nestjs/common';
import { Document, Model } from 'mongoose';
export class Repository<T extends Document> {
    constructor(private model: Model<T>) {}

    async create(item: T) {
        try {
            return this.model.create(item);
        } catch (error) {
            Promise.reject(error);
        }
    }

    getModel() {
        return this.model;
    }

    getOneByCondition(condition: any) {
        return this.model.findOne(condition);
    }

    getAllByCondition(condition: any) {
        return this.model.find(condition).exec();
    }

    async getAll(limit = 5, page = 1, search = {}) {
        const totalDocs = await this.model.countDocuments(search);
        if (!totalDocs) {
            throw new HttpException('Not have any data', 400);
        }
        const totalPage = Math.ceil(totalDocs / limit);
        page > totalPage ? (page = totalPage) : page;
        const docsView = await this.model
            .find(search)
            .skip((page - 1) * limit)
            .limit(limit);
        return {
            currentPage: page,
            totalPage: totalPage,
            data: docsView,
        };
    }

    updateById(id: string, item: any) {
        return this.model.findByIdAndUpdate({ _id: id }, { $set: item }).exec();
    }

    delete(id: string) {
        return this.model.deleteOne({ _id: id });
    }

    test() {
        return this.model.find();
    }
}
