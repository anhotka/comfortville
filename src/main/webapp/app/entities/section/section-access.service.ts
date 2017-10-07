import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { SectionAccess } from './section-access.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SectionAccessService {

    private resourceUrl = SERVER_API_URL + 'api/sections';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/sections';

    constructor(private http: Http) { }

    create(section: SectionAccess): Observable<SectionAccess> {
        const copy = this.convert(section);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(section: SectionAccess): Observable<SectionAccess> {
        const copy = this.convert(section);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<SectionAccess> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(section: SectionAccess): SectionAccess {
        const copy: SectionAccess = Object.assign({}, section);
        return copy;
    }
}
