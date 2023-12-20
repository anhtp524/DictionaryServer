import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ObjectId } from 'mongoose';
import { ElasticSearchService } from 'src/Share/elasticsearch/elasticsearch.service';
import { TayRepository } from '../Tay/tay.repository';
import { Tay } from '../Tay/tay.schema';
import { VietRepository } from '../Viet/viet.repository';
import { Viet } from '../Viet/viet.schema';
import { viTayRepository } from './viTay.repository';
import { viTayDocument } from './viTay.schema';

@Injectable()
export class viTayService {
    constructor(
        private readonly viTayRepo: viTayRepository,
        private readonly configService: ConfigService,
        private vietRepo: VietRepository,
        private tayRepo: TayRepository,
        private readonly esService: ElasticSearchService,
    ) {}

    // tạo các data Viet-Tay bằng cách lưu trữ id Việt và id Tày tương ứng
    async create() {
        const dataVi = await this.vietRepo.test();
        const dataTay = await this.tayRepo.test();
        let idViTest: any = '';
        let wordVi: any = '';
        await dataVi.forEach(async (value, index) => {
            if (value.word === wordVi) {
                const obj = {
                    idVi: idViTest,
                    idTay: dataTay[index]._id,
                };
                await this.viTayRepo.create(<viTayDocument>obj);
                await this.vietRepo.delete(value._id);
            } else {
                const obj = {
                    idVi: value._id,
                    idTay: dataTay[index]._id,
                };
                idViTest = value._id;
                wordVi = value.word;
                await this.viTayRepo.create(<viTayDocument>obj);
            }
        });
    }

    // chuyển data trong database mongoDB sang database ES
    async indexESData() {
        try {
            const dataVietTay = await this.viTayRepo.getAllVietTay();
            for (const viet_tay of dataVietTay) {
                await this.esService.indexVietTay({
                    idVietTay: (viet_tay._id as ObjectId).toString(),
                    viet: (viet_tay.idVi as unknown as Viet).word,
                    tay: (viet_tay.idTay as unknown as Tay).word,
                    description: (viet_tay.idTay as unknown as Tay).description,
                });
            }
            console.log('create ES Data success');
        } catch (err) {
            throw err;
        }
    }

    async translate(word: string, language: string) {
        const words = await this.viTayRepo.translate(word, language);
        if (words.length === 0) {
            return word;
        }
        if (language === 'tay') {
            return words.map((value) => value.idVi as unknown as Viet);
        }
        return words.map((value) => value.idTay as unknown as Tay);
    }

    async translateByElasticSearch(word: string, language: string) {
        const words = await this.esService.search(word, language);
        if (words.length === 0) {
            return word;
        }
        return words;
    }

    async wordSuggeston(word: string, language: string) {
        const words = await this.esService.WordSuggestion(word, language);
        if (words.length === 0) {
            return word;
        }
        return words;
    }

    // async translateSequenceTextVietnamToTay(text: string) {
    //     const arrWord = text.split(' ');
    //     const test: any[] = [];
    //     for (const value of arrWord) {
    //         const result = await this.viTayRepo.getVietToTay(value);

    //         test.push(result);
    //     }
    //     let result = [];
    //     this.backTrackingAlgorithm(test, arrWord.length, 0, 0, [], result);
    //     return {
    //         listSequenceText: result,
    //     };
    // }

    // async translateVietToTay(text: string) {
    //     const arrWord = text.split(' ');
    //     const test = "";
    //     for (let i = 0; i < arrWord.length; i++) {
    //         let result = "";

    //         while (i < arrWord.length) {
    //             result = (await this.viTayRepo.getVietToTay(result))[0]

    //         }
    //     }
    //     let result = [];
    //     this.backTrackingAlgorithm(test, arrWord.length, 0, 0, [], result);
    //     return {
    //         listSequenceText: result,
    //     };
    // }

    // async translateSequenceTextTayToVietnam(text: string) {
    //     const arrWord = text.split(' ');
    //     const test: any[] = [];
    //     for (const value of arrWord) {
    //         const result = await this.viTayRepo.getTaytoViet(value);

    //         test.push(result);
    //     }
    //     let result = [];
    //     this.backTrackingAlgorithm(test, arrWord.length, 0, 0, [], result);
    //     return {
    //         listSequenceText: result,
    //     };
    // }
}
