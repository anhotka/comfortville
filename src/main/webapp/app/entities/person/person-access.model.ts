import { BaseEntity } from './../../shared';

export class PersonAccess implements BaseEntity {
    constructor(
        public id?: number,
        public picContentType?: string,
        public pic?: any,
        public type?: string,
        public userId?: number,
    ) {
    }
}
