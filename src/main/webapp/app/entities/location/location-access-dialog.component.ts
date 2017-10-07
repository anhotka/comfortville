import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LocationAccess } from './location-access.model';
import { LocationAccessPopupService } from './location-access-popup.service';
import { LocationAccessService } from './location-access.service';

@Component({
    selector: 'jhi-location-access-dialog',
    templateUrl: './location-access-dialog.component.html'
})
export class LocationAccessDialogComponent implements OnInit {

    location: LocationAccess;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private locationService: LocationAccessService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.location.id !== undefined) {
            this.subscribeToSaveResponse(
                this.locationService.update(this.location));
        } else {
            this.subscribeToSaveResponse(
                this.locationService.create(this.location));
        }
    }

    private subscribeToSaveResponse(result: Observable<LocationAccess>) {
        result.subscribe((res: LocationAccess) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: LocationAccess) {
        this.eventManager.broadcast({ name: 'locationListModification', content: 'OK'});
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
    selector: 'jhi-location-access-popup',
    template: ''
})
export class LocationAccessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private locationPopupService: LocationAccessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.locationPopupService
                    .open(LocationAccessDialogComponent as Component, params['id']);
            } else {
                this.locationPopupService
                    .open(LocationAccessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
