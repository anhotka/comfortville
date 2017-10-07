import { BaseEntity } from './../../shared';

export class CommentAccess implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public text?: string,
        public date?: any,
        public personId?: number,
        public siteId?: number,
    ) {
    }
}
