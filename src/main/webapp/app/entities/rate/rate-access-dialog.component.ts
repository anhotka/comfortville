import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RateAccess } from './rate-access.model';
import { RateAccessPopupService } from './rate-access-popup.service';
import { RateAccessService } from './rate-access.service';
import { SiteAccess, SiteAccessService } from '../site';
import { PersonAccess, PersonAccessService } from '../person';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rate-access-dialog',
    templateUrl: './rate-access-dialog.component.html'
})
export class RateAccessDialogComponent implements OnInit {

    rate: RateAccess;
    isSaving: boolean;

    sites: SiteAccess[];

    people: PersonAccess[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private rateService: RateAccessService,
        private siteService: SiteAccessService,
        private personService: PersonAccessService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.siteService
            .query({filter: 'rate-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.rate.siteId) {
                    this.sites = res.json;
                } else {
                    this.siteService
                        .find(this.rate.siteId)
                        .subscribe((subRes: SiteAccess) => {
                            this.sites = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.personService
            .query({filter: 'rate-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.rate.personId) {
                    this.people = res.json;
                } else {
                    this.personService
                        .find(this.rate.personId)
                        .subscribe((subRes: PersonAccess) => {
                            this.people = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rateService.update(this.rate));
        } else {
            this.subscribeToSaveResponse(
                this.rateService.create(this.rate));
        }
    }

    private subscribeToSaveResponse(result: Observable<RateAccess>) {
        result.subscribe((res: RateAccess) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RateAccess) {
        this.eventManager.broadcast({ name: 'rateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackSiteById(index: number, item: SiteAccess) {
        return item.id;
    }

    trackPersonById(index: number, item: PersonAccess) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rate-access-popup',
    template: ''
})
export class RateAccessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ratePopupService: RateAccessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ratePopupService
                    .open(RateAccessDialogComponent as Component, params['id']);
            } else {
                this.ratePopupService
                    .open(RateAccessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
