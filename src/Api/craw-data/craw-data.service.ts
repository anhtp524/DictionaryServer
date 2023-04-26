import { Injectable } from '@nestjs/common';
import { NestCrawlerService } from 'nest-crawler';
import * as fs from 'fs';

@Injectable()
export class CrawlerService {
    constructor(private readonly crawler: NestCrawlerService) {}

    // scraping the specific page
    public async scrape(): Promise<string[]> {
        interface ExampleCom {
            info: string;
        }
        const arrUrl = [
            'https://vov4.vov.vn/taynung/phan-tin-va-bai-fiet-tin-tuc-su-kien/pi-noong-du-ban-con-pao-chuc-dong-may-chang-nam-kem-379253.vov4',
            'https://vov4.vov.vn/taynung/phan-tin-va-bai-fiet-tin-tuc-su-kien/tao-fu-chao-cao-bang-401900.vov4',
            'https://vov4.vov.vn/taynung/phan-tin-va-bai-fiet-tin-tuc-su-kien/pi-noong-dan-toc-noi-can-du-binh-lieu-quang-ninh-long-reng-tang-co-ban-con-mau-401890.vov4',
            'https://vov4.vov.vn/taynung/phan-tin-va-bai-fiet-tin-tuc-su-kien/bai-slay-slu-du-ban-401830.vov4',
            'https://vov4.vov.vn/taynung/phan-tin-va-bai-fiet-tin-tuc-su-kien/can-san-chi-du-tin-phja-cao-ly-357579.vov4',
            'https://vov4.vov.vn/taynung/phan-tin-va-bai-fiet-tin-tuc-su-kien/bung-slung-bac-kan-xay-can-tang-lan-pinh-la-331880.vov4',
            'https://vov4.vov.vn/taynung/phan-tin-va-bai-fiet-tin-tuc-su-kien/xay-can-tang-co-ban-con-mau-du-bung-dan-toc-noi-can-cua-hoen-kon-plong-376641.vov4',
            'https://vov4.vov.vn/taynung/bai-thinh-chia-pang-choi-va-luat-mau-tim-hieu-chinh-sach-phap-luat/sluong-toi-bai-tin-mai-du-tenh-chia-khai-slinh-le-pi-noong-can-het-pen-ru-401435.vov4',
        ];
        let arr_data: string[] = [];

        for (const value of arrUrl) {
            const data: ExampleCom = await this.crawler.fetch({
                target: value,
                fetch: {
                    info: {
                        selector: '.text-long > p',
                        // texteq: 0,
                    },
                },
            });
            // Gộp nhiều dấu space thành 1 space
            data.info = data.info.replace(/\s+/g, ' ');
            // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của xâu
            data.info.trim();

            data.info = data.info.replace(/\"|“|”|.\//g, '');

            data.info = data.info.replace(/:/g, '.');

            const arr_value: string[] = data.info.split('. ');
            //
            arr_data = [...arr_data, ...arr_value];
        }

        return arr_data;

        // fs.writeFile('data.txt', data.info, function (err) {
        //     if (err) {
        //        throw (err);
        //     }
        // });
        // {
        //   title: 'Example Domain',
        //   info: 'http://www.iana.org/domains/example',
        //   content: '<div><h1>Example Heading</h1><p>Example Paragraph</p></div>'
        // }
    }

    // crawling multi pages is also supported
    public async crawl(): Promise<void> {
        interface HackerNewsPage {
            title: string;
        }

        const pages: HackerNewsPage[] = await this.crawler.fetch({
            target: {
                url: 'https://news.ycombinator.com',
                iterator: {
                    selector: 'span.age > a',
                    convert: (x: string) => `https://news.ycombinator.com/${x}`,
                },
            },
            fetch: (data: any, index: number, url: string) => ({
                title: '.title > a',
            }),
        });

        console.log(pages);
        // [
        //   { title: 'Post Title 1' },
        //   { title: 'Post Title 2' },
        //   ...
        //   ...
        //   { title: 'Post Title 30' }
        // ]
    }
}
