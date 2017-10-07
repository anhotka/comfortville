import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { SiteAccess } from './site-access.model';
import { SiteAccessService } from './site-access.service';

@Component({
    selector: 'jhi-site-access-detail',
    templateUrl: './site-access-detail.component.html'
})
export class SiteAccessDetailComponent implements OnInit, OnDestroy {

    site: SiteAccess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private siteService: SiteAccessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSites();
    }

    load(id) {
        this.siteService.find(id).subscribe((site) => {
            this.site = site;
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

    registerChangeInSites() {
        this.eventSubscriber = this.eventManager.subscribe(
            'siteListModification',
            (response) => this.load(this.site.id)
        );
    }
}
