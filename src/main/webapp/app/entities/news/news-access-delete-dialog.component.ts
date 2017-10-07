import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NewsAccess } from './news-access.model';
import { NewsAccessPopupService } from './news-access-popup.service';
import { NewsAccessService } from './news-access.service';

@Component({
    selector: 'jhi-news-access-delete-dialog',
    templateUrl: './news-access-delete-dialog.component.html'
})
export class NewsAccessDeleteDialogComponent {

    news: NewsAccess;

    constructor(
        private newsService: NewsAccessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.newsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'newsListModification',
                content: 'Deleted an news'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-news-access-delete-popup',
    template: ''
})
export class NewsAccessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private newsPopupService: NewsAccessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.newsPopupService
                .open(NewsAccessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
