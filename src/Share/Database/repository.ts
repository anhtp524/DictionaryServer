/* eslint-disable prettier/prettier */
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

    getOneByCondition(condition: any) {
        return this.model.findOne(condition);
    }

    getAllByCondition(condition: any) {
        return this.model.find(condition);
    }

    delete(id: string) {
        return this.model.deleteOne({ _id: id });
    }

    test() {
        return this.model.find();
    }
}
