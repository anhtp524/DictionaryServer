/* eslint-disable prettier/prettier */
import { Document, Model } from 'mongoose';
export class Repository<T extends Document> {
    constructor(private _repository: Model<T>) {}

    async getOneByCondition(condition: any): Promise<T> {
        return await this._repository.findOne(condition);
    }

    async getAllByCondition(condition: any): Promise<T[]> {
        return await this._repository.find(condition);
    }
}
