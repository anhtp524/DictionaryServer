import { Injectable } from '@nestjs/common';
import { TayRepository } from '../Tay/tay.repository';
import { VietRepository } from '../Viet/viet.repository';
import { viTayRepository } from './viTay.repository';
import { viTayDocument } from './viTay.schema';

@Injectable()
export class viTayService {
    constructor(
        private readonly viTayRepo: viTayRepository,
        // private vietRepo: VietRepository,
        // private tayRepo: TayRepository,
    ) {}

    // async create() {
    //     const dataVi = await this.vietRepo.test();
    //     const dataTay = await this.tayRepo.test();
    //     await dataVi.forEach((value, index) => {
    //         const obj = {
    //             idVi: value._id,
    //             idTay: dataTay[index]._id,
    //         };

    //         this.viTayRepo.create(<viTayDocument>obj);
    //     });
    // }

    getVietToTay(word: string) {
        return this.viTayRepo.getVietToTay(word);
    }

    getTayToViet(word: string) {
        return this.viTayRepo.getTaytoViet(word);
    }
}
