import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { SectionAccess } from './section-access.model';
import { SectionAccessPopupService } from './section-access-popup.service';
import { SectionAccessService } from './section-access.service';

@Component({
    selector: 'jhi-section-access-dialog',
    templateUrl: './section-access-dialog.component.html'
})
export class SectionAccessDialogComponent implements OnInit {

    section: SectionAccess;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private alertService: JhiAlertService,
        private sectionService: SectionAccessService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
        this.dataUtils.clearInputImage(this.section, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.section.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sectionService.update(this.section));
        } else {
            this.subscribeToSaveResponse(
                this.sectionService.create(this.section));
        }
    }

    private subscribeToSaveResponse(result: Observable<SectionAccess>) {
        result.subscribe((res: SectionAccess) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SectionAccess) {
        this.eventManager.broadcast({ name: 'sectionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-section-access-popup',
    template: ''
})
export class SectionAccessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sectionPopupService: SectionAccessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sectionPopupService
                    .open(SectionAccessDialogComponent as Component, params['id']);
            } else {
                this.sectionPopupService
                    .open(SectionAccessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
