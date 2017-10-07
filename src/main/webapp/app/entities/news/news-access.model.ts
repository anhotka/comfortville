import { BaseEntity } from './../../shared';

export class NewsAccess implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public text?: string,
        public date?: any,
        public personId?: number,
    ) {
    }
}
