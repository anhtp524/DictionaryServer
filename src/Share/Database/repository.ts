/* eslint-disable prettier/prettier */
import { Document, Model } from 'mongoose';
export class Repository<T extends Document> {
    constructor(private model: Model<T>) {}

    async create(item: T) {
        try{
            return this.model.create(item)
        }
        catch(error) {
            Promise.reject(error)
        }
    }

    getOneByCondition(condition: any) {
        return this.model.findOne(condition);
    }

    getAllByCondition(condition: any) {
        return this.model.find(condition);
    }

    test() {
        return this.model.find()
    }
}
