
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
        return this.model.find(condition).exec();
    }

    async getAll(limit: number = 5 , page: number = 1, search: string = "") {
        const condition = new RegExp('.*' + search + '.*', 'i')
        const totalDocs = await this.model.countDocuments({name: condition})
        const totalPage = Math.ceil(totalDocs / limit)
        page > totalPage ? (page = totalPage) : page
        const docsView = await this.model  
                                    .find({name: condition, $isDeleted : false})
                                    .skip((page - 1) * limit) 
                                    .limit(limit)
        return {
                currentPage: page,
                totalPage: totalPage,
                data: docsView
            }
    }

    updateById(id: string, item: any) {
        return this.model.findByIdAndUpdate({_id: id}, {$set: item}).exec()
    }

    delete(id: string) {
        return this.model.deleteOne({ _id: id });
    }


    test() {
        return this.model.find();
    }


}
