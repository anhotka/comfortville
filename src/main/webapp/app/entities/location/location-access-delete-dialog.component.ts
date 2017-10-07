import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LocationAccess } from './location-access.model';
import { LocationAccessPopupService } from './location-access-popup.service';
import { LocationAccessService } from './location-access.service';

@Component({
    selector: 'jhi-location-access-delete-dialog',
    templateUrl: './location-access-delete-dialog.component.html'
})
export class LocationAccessDeleteDialogComponent {

    location: LocationAccess;

    constructor(
        private locationService: LocationAccessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.locationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'locationListModification',
                content: 'Deleted an location'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-location-access-delete-popup',
    template: ''
})
export class LocationAccessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private locationPopupService: LocationAccessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.locationPopupService
                .open(LocationAccessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
