import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticSearchService {
    constructor(private readonly esService: ElasticsearchService, private readonly configService: ConfigService) {}

    public async createIndex() {
        const index = this.configService.get('ELASTICSEARCH_INDEX');
        const checkIndex = await this.esService.indices.exists({ index });
        console.log(`checkIndex:${checkIndex}`);
        // tslint:disable-next-line:early-exit
        if (!checkIndex) {
            this.esService.indices.create({
                index,
                body: {
                    mappings: {
                        properties: {
                            idVietTay: {
                                type: 'text',
                                fields: {
                                    keyword: {
                                        type: 'keyword',
                                        ignore_above: 256,
                                    },
                                },
                            },
                            viet: {
                                type: 'text',
                                fields: {
                                    keyword: {
                                        type: 'keyword',
                                        ignore_above: 256,
                                    },
                                },
                            },
                            tay: {
                                type: 'text',
                                fields: {
                                    keyword: {
                                        type: 'keyword',
                                        ignore_above: 256,
                                    },
                                },
                            },
                            description: {
                                type: 'text',
                                fields: {
                                    keyword: {
                                        type: 'keyword',
                                        ignore_above: 256,
                                    },
                                },
                            },
                        },
                    },
                    settings: {
                        analysis: {
                            filter: {
                                autocomplete_filter: {
                                    type: 'edge_ngram',
                                    min_gram: 1,
                                    max_gram: 20,
                                },
                            },
                            analyzer: {
                                autocomplete: {
                                    type: 'custom',
                                    tokenizer: 'standard',
                                    filter: ['lowercase', 'autocomplete_filter'],
                                },
                            },
                        },
                    },
                },
            });
        }
    }

    async indexVietTay(viet_tay: any) {
        return await this.esService.index({
            index: this.configService.get('ELASTICSEARCH_INDEX')!,
            body: viet_tay,
        });
    }

    async search(text: string, language: string) {
        if (language === 'viet') {
            const search = await this.esService.search({
                body: {
                    query: {
                        bool: {
                            must: {
                                term: {
                                    'viet.keyword': {
                                        value: text,
                                    },
                                },
                            },
                        },
                    },
                },
            });
            const hits = search.hits.hits;
            const arr = [];
            hits.filter((item) => {
                arr.push({
                    tay: (item._source as any).tay,
                    description: (item._source as any).description,
                });
            });
            return arr;
        }
        const search = await this.esService.search({
            body: {
                query: {
                    bool: {
                        must: {
                            term: {
                                'tay.keyword': {
                                    value: text,
                                },
                            },
                        },
                    },
                },
            },
        });
        const hits = search.hits.hits;
        return hits.map((item) => (item._source as any).viet);
    }

    async getVietTayId(viet: string, tay: string) {
        try {
            const search = await this.esService.search({
                body: {
                    query: {
                        bool: {
                            must: [
                                { term: { 'tay.keyword': { value: tay } } },
                                { term: { 'viet.keyword': { value: viet } } },
                            ],
                        },
                    },
                },
            });
            const hits = search.hits.hits;
            return (hits[0]._source as any).idVietTay;
        } catch (err) {
            throw new HttpException('Can not find this word ID', 400);
        }
    }

    async WordSuggestion(text: string, language: string) {
        if (language === 'viet') {
            const search = await this.esService.search({
                body: {
                    query: {
                        match: {
                            viet: text,
                        },
                    },
                },
            });
            const hits = search.hits.hits;
            return hits.map((item) => (item._source as any).viet);
        }
        const search = await this.esService.search({
            body: {
                query: {
                    match: {
                        tay: text,
                    },
                },
            },
        });
        const hits = search.hits.hits;
        return hits.map((item) => (item._source as any).tay);
    }
}
