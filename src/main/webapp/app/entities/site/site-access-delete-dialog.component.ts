import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SiteAccess } from './site-access.model';
import { SiteAccessPopupService } from './site-access-popup.service';
import { SiteAccessService } from './site-access.service';

@Component({
    selector: 'jhi-site-access-delete-dialog',
    templateUrl: './site-access-delete-dialog.component.html'
})
export class SiteAccessDeleteDialogComponent {

    site: SiteAccess;

    constructor(
        private siteService: SiteAccessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.siteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'siteListModification',
                content: 'Deleted an site'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-site-access-delete-popup',
    template: ''
})
export class SiteAccessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sitePopupService: SiteAccessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sitePopupService
                .open(SiteAccessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
