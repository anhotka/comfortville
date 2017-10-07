import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CommentAccess } from './comment-access.model';
import { CommentAccessPopupService } from './comment-access-popup.service';
import { CommentAccessService } from './comment-access.service';

@Component({
    selector: 'jhi-comment-access-delete-dialog',
    templateUrl: './comment-access-delete-dialog.component.html'
})
export class CommentAccessDeleteDialogComponent {

    comment: CommentAccess;

    constructor(
        private commentService: CommentAccessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'commentListModification',
                content: 'Deleted an comment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comment-access-delete-popup',
    template: ''
})
export class CommentAccessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentPopupService: CommentAccessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.commentPopupService
                .open(CommentAccessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
