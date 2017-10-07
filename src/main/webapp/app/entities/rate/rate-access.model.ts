import { BaseEntity } from './../../shared';

export class RateAccess implements BaseEntity {
    constructor(
        public id?: number,
        public score?: number,
        public date?: any,
        public siteId?: number,
        public personId?: number,
    ) {
    }
}
