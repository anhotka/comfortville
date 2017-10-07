import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RateAccess } from './rate-access.model';
import { RateAccessPopupService } from './rate-access-popup.service';
import { RateAccessService } from './rate-access.service';

@Component({
    selector: 'jhi-rate-access-delete-dialog',
    templateUrl: './rate-access-delete-dialog.component.html'
})
export class RateAccessDeleteDialogComponent {

    rate: RateAccess;

    constructor(
        private rateService: RateAccessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rateListModification',
                content: 'Deleted an rate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rate-access-delete-popup',
    template: ''
})
export class RateAccessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ratePopupService: RateAccessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ratePopupService
                .open(RateAccessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
