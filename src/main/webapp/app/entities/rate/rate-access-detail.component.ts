import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { RateAccess } from './rate-access.model';
import { RateAccessService } from './rate-access.service';

@Component({
    selector: 'jhi-rate-access-detail',
    templateUrl: './rate-access-detail.component.html'
})
export class RateAccessDetailComponent implements OnInit, OnDestroy {

    rate: RateAccess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rateService: RateAccessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRates();
    }

    load(id) {
        this.rateService.find(id).subscribe((rate) => {
            this.rate = rate;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rateListModification',
            (response) => this.load(this.rate.id)
        );
    }
}
