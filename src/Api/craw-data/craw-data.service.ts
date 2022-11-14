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

        const data: ExampleCom = await this.crawler.fetch({
            target: 'https://vov4.vov.vn/taynung/phan-tin-va-bai-fiet-tin-tuc-su-kien/pi-noong-du-ban-con-pao-chuc-dong-may-chang-nam-kem-379253.vov4',
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

        data.info = data.info.replace(/\"|“|”|.\//g, '')

        const arr_data: string[] = data.info.split('. ')
        //
        console.log(arr_data);
        
        return arr_data

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
