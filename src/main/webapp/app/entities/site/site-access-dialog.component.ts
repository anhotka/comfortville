import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { SiteAccess } from './site-access.model';
import { SiteAccessPopupService } from './site-access-popup.service';
import { SiteAccessService } from './site-access.service';
import { LocationAccess, LocationAccessService } from '../location';
import { SectionAccess, SectionAccessService } from '../section';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-site-access-dialog',
    templateUrl: './site-access-dialog.component.html'
})
export class SiteAccessDialogComponent implements OnInit {

    site: SiteAccess;
    isSaving: boolean;

    locations: LocationAccess[];

    sections: SectionAccess[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private alertService: JhiAlertService,
        private siteService: SiteAccessService,
        private locationService: LocationAccessService,
        private sectionService: SectionAccessService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.locationService
            .query({filter: 'site-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.site.locationId) {
                    this.locations = res.json;
                } else {
                    this.locationService
                        .find(this.site.locationId)
                        .subscribe((subRes: LocationAccess) => {
                            this.locations = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.sectionService.query()
            .subscribe((res: ResponseWrapper) => { this.sections = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.site, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.site.id !== undefined) {
            this.subscribeToSaveResponse(
                this.siteService.update(this.site));
        } else {
            this.subscribeToSaveResponse(
                this.siteService.create(this.site));
        }
    }

    private subscribeToSaveResponse(result: Observable<SiteAccess>) {
        result.subscribe((res: SiteAccess) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SiteAccess) {
        this.eventManager.broadcast({ name: 'siteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackLocationById(index: number, item: LocationAccess) {
        return item.id;
    }

    trackSectionById(index: number, item: SectionAccess) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-site-access-popup',
    template: ''
})
export class SiteAccessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sitePopupService: SiteAccessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sitePopupService
                    .open(SiteAccessDialogComponent as Component, params['id']);
            } else {
                this.sitePopupService
                    .open(SiteAccessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
