/* eslint-disable @typescript-eslint/no-inferrable-types */
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
    //     // eslint-disable-next-line prefer-const
    //     let idViTest: any = '';
    //     // eslint-disable-next-line prefer-const
    //     let wordVi: string = '';
    //     await dataVi.forEach(async (value, index) => {
    //         if (value.word === wordVi) {
    //             const obj = {
    //                 idVi: idViTest,
    //                 idTay: dataTay[index]._id,
    //             };
    //             await this.viTayRepo.create(<viTayDocument>obj);
    //             await this.vietRepo.delete(value._id);
    //         } else {
    //             const obj = {
    //                 idVi: value._id,
    //                 idTay: dataTay[index]._id,
    //             };
    //             idViTest = value._id;
    //             wordVi = value.word;
    //             this.viTayRepo.create(<viTayDocument>obj);
    //         }
    //     });
    // }

    getVietToTay(word: string) {
        return this.viTayRepo.getVietToTay(word);
    }

    getTayToViet(word: string) {
        return this.viTayRepo.getTaytoViet(word);
    }

    // async translateSequenceText(text: string) {
    //     const arrWord = text.split(' ');

    //     const test: any[] = [];
    //     let s: string = '';
    //     for (const value of arrWord) {
    //         console.log(value);

    //         const result = await this.viTayRepo.getVietToTay(value);
    //         console.log(result);

    //         //console.log(result);
    //         const word = result[0].toJSON().idTay.word;
    //         s += word + ' ';

    //         //console.log(result.toJSON().idTay.word);
    //         //const test2 = result[0].idTay.word
    //         test.push(result);
    //     }

    //     // const test =  arrWord.map(function cb(value, index) {
    //     //     console.log(value);
    //     //     const result = this.viTayRepo.getVietToTay(value)
    //     //     return result
    //     // })

    //     return s;
    // }
}