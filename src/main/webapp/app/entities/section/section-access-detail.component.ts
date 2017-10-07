import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { SectionAccess } from './section-access.model';
import { SectionAccessService } from './section-access.service';

@Component({
    selector: 'jhi-section-access-detail',
    templateUrl: './section-access-detail.component.html'
})
export class SectionAccessDetailComponent implements OnInit, OnDestroy {

    section: SectionAccess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private sectionService: SectionAccessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSections();
    }

    load(id) {
        this.sectionService.find(id).subscribe((section) => {
            this.section = section;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSections() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sectionListModification',
            (response) => this.load(this.section.id)
        );
    }
}
