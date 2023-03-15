import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
 
@Injectable()
export class ElasticSearchService {
  constructor(
    private readonly esService: ElasticsearchService, private readonly configService: ConfigService
  ) { }
  
  public async createIndex() {
    const index = this.configService.get('ELASTICSEARCH_INDEX');
    const checkIndex = await this.esService.indices.exists({ index });
    console.log(`checkIndex:${checkIndex}`);
    // tslint:disable-next-line:early-exit
    if (!checkIndex) {
      this.esService.indices.create(
        {
          index,
          body: {
            mappings: {
              properties: {
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
        },
      );
    }
  }

  async indexVietTay(viet_tay: any) {
    return await this.esService.index({
      index: this.configService.get('ELASTICSEARCH_INDEX')!,
      body: viet_tay,
    });
  }
 
  async search(text: string) {
    const search = await this.esService.search({
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['viet']
          }
        }
      }
    })
    const hits = search.hits.hits;
    return hits.map((item) => item._source);
  }
}