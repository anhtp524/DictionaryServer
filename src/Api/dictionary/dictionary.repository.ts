import { DictionaryDocument } from './dictionary.schema';
import { Repository } from 'src/Share/Database/repository';

export class DictionaryRepository extends Repository<DictionaryDocument> {}
