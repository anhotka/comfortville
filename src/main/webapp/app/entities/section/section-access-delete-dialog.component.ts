import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SectionAccess } from './section-access.model';
import { SectionAccessPopupService } from './section-access-popup.service';
import { SectionAccessService } from './section-access.service';

@Component({
    selector: 'jhi-section-access-delete-dialog',
    templateUrl: './section-access-delete-dialog.component.html'
})
export class SectionAccessDeleteDialogComponent {

    section: SectionAccess;

    constructor(
        private sectionService: SectionAccessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sectionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sectionListModification',
                content: 'Deleted an section'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-section-access-delete-popup',
    template: ''
})
export class SectionAccessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sectionPopupService: SectionAccessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sectionPopupService
                .open(SectionAccessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
