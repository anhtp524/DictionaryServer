/* eslint-disable prettier/prettier */
import { Document, Model } from 'mongoose';
export class Repository<T extends Document> {
    constructor(private _repository: Model<T>) {}

    getOneByCondition(condition: any) {
        return this._repository.findOne(condition);
    }

    getAllByCondition(condition: any) {
        return this._repository.find(condition);
    }
}
