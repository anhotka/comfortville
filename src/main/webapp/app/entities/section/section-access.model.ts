import { BaseEntity } from './../../shared';

export class SectionAccess implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public picContentType?: string,
        public pic?: any,
    ) {
    }
}
