import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { NewsAccess } from './news-access.model';
import { NewsAccessPopupService } from './news-access-popup.service';
import { NewsAccessService } from './news-access.service';
import { PersonAccess, PersonAccessService } from '../person';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-news-access-dialog',
    templateUrl: './news-access-dialog.component.html'
})
export class NewsAccessDialogComponent implements OnInit {

    news: NewsAccess;
    isSaving: boolean;

    people: PersonAccess[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private newsService: NewsAccessService,
        private personService: PersonAccessService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService.query()
            .subscribe((res: ResponseWrapper) => { this.people = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.news.id !== undefined) {
            this.subscribeToSaveResponse(
                this.newsService.update(this.news));
        } else {
            this.subscribeToSaveResponse(
                this.newsService.create(this.news));
        }
    }

    private subscribeToSaveResponse(result: Observable<NewsAccess>) {
        result.subscribe((res: NewsAccess) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: NewsAccess) {
        this.eventManager.broadcast({ name: 'newsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackPersonById(index: number, item: PersonAccess) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-news-access-popup',
    template: ''
})
export class NewsAccessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private newsPopupService: NewsAccessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.newsPopupService
                    .open(NewsAccessDialogComponent as Component, params['id']);
            } else {
                this.newsPopupService
                    .open(NewsAccessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
