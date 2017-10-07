import { BaseEntity } from './../../shared';

export class LocationAccess implements BaseEntity {
    constructor(
        public id?: number,
        public address?: string,
        public coordinates?: string,
    ) {
    }
}
