import { BaseEntity } from './../../shared';

export class SiteAccess implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public photoContentType?: string,
        public photo?: any,
        public locationId?: number,
        public sectionId?: number,
    ) {
    }
}
