
import { Repository } from 'src/Share/Database/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UserRepository extends Repository<UserDocument> {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super(userModel);
    }

    checkUserExist(username: string, email: string): Promise<User> {
        console.log('22');
        
        return this.userModel.findOne({'username': username, 'email': email}).exec();
    }
}
