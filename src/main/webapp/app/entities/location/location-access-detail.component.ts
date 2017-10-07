import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { LocationAccess } from './location-access.model';
import { LocationAccessService } from './location-access.service';

@Component({
    selector: 'jhi-location-access-detail',
    templateUrl: './location-access-detail.component.html'
})
export class LocationAccessDetailComponent implements OnInit, OnDestroy {

    location: LocationAccess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private locationService: LocationAccessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLocations();
    }

    load(id) {
        this.locationService.find(id).subscribe((location) => {
            this.location = location;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLocations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'locationListModification',
            (response) => this.load(this.location.id)
        );
    }
}
