import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PersonAccess } from './person-access.model';
import { PersonAccessPopupService } from './person-access-popup.service';
import { PersonAccessService } from './person-access.service';

@Component({
    selector: 'jhi-person-access-delete-dialog',
    templateUrl: './person-access-delete-dialog.component.html'
})
export class PersonAccessDeleteDialogComponent {

    person: PersonAccess;

    constructor(
        private personService: PersonAccessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'personListModification',
                content: 'Deleted an person'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-person-access-delete-popup',
    template: ''
})
export class PersonAccessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personPopupService: PersonAccessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.personPopupService
                .open(PersonAccessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
