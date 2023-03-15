import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticSearchService } from 'src/Share/elasticsearch/elasticsearch.service';
import { TayRepository } from '../Tay/tay.repository';
import { Tay } from '../Tay/tay.schema';
import { VietRepository } from '../Viet/viet.repository';
import { Viet } from '../Viet/viet.schema';
import { viTayRepository } from './viTay.repository';
import { Viet_Tay, viTayDocument } from './viTay.schema';

@Injectable()
export class viTayService {
    constructor(private readonly viTayRepo: viTayRepository,private readonly configService: ConfigService , private vietRepo: VietRepository, private tayRepo: TayRepository, private readonly esService: ElasticSearchService)
    {
    }

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
                await this.viTayRepo.create(<viTayDocument>obj)
                await this.vietRepo.delete(value._id);
            } else {
                const obj = {
                    idVi: value._id,
                    idTay: dataTay[index]._id,
                };
                idViTest = value._id;
                wordVi = value.word;
                await this.viTayRepo.create(<viTayDocument>obj)
            }
        });
    }

    async getVietToTay(word: string) {   
        const words = await this.viTayRepo.getVietToTay(word);
        if (words.length === 0) {
            throw new HttpException('Your input word do not have any word output' , 400)
        }
        return words.map((value) => (value.idTay as unknown as Tay).word)
    }

    async indexESData() {
        try {
            const dataVietTay = await this.viTayRepo.getAllVietTay();
            for (const viet_tay of dataVietTay) {
                await this.esService.indexVietTay({
                    viet: (viet_tay.idVi as unknown as Viet).word,
                    tay: (viet_tay.idTay as unknown as Tay).word,
                    description: (viet_tay.idTay as unknown as Tay).description
                })          
            }   
            console.log('create ES Data success');                        
        } catch (err) {
            throw err;
        }
    }

    async getVietToTayByElasticSearch(word: string) {  
        const words = await this.esService.search(word);
        if (words.length === 0) {
            throw new HttpException('Your input word do not have any word output' , 400)
        }
        return words;
    }

    getTayToViet(word: string) {
        return this.viTayRepo.getTaytoViet(word);
    }

    async translateSequenceTextVietnamToTay(text: string) {
        const arrWord = text.split(' ');
        const test: any[] = [];
        for (const value of arrWord) {
            const result = await this.viTayRepo.getVietToTay(value);

            test.push(result);
        }
        let result = [];
        this.backTrackingAlgorithm(test, arrWord.length, 0, 0, [], result);
        return {
            listSequenceText: result,
        };
    }

    // async translateVietToTay(text: string) {
    //     const arrWord = text.split(' ');
    //     const test = "";
    //     for (let i = 0; i < arrWord.length; i++) {
    //         let result = "";

    //         while (i < arrWord.length) {
    //             result = (await this.viTayRepo.getVietToTay(result))[0]

    //         }
    //     }
    //     // let result = [];
    //     // this.backTrackingAlgorithm(test, arrWord.length, 0, 0, [], result);
    //     // return {
    //     //     listSequenceText: result,
    //     // };
    // }

    async translateSequenceTextTayToVietnam(text: string) {
        const arrWord = text.split(' ');
        const test: any[] = [];
        for (const value of arrWord) {
            const result = await this.viTayRepo.getTaytoViet(value);

            test.push(result);
        }
        let result = [];
        this.backTrackingAlgorithm(test, arrWord.length, 0, 0, [], result);
        return {
            listSequenceText: result,
        };
    }

    backTrackingAlgorithm(arr: any[], l: number, indexArrWord: number, j: number, x: any[], result: any[]) {
        for (const value of arr[j]) {
            x[indexArrWord] = value.idTay.word;
            if (indexArrWord === l - 1) {
                result.push(x.join(' '));
            } else {
                this.backTrackingAlgorithm(arr, l, indexArrWord + 1, j + 1, x, result);
            }
        }
    }
}
