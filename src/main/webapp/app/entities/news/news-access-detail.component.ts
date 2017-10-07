import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { NewsAccess } from './news-access.model';
import { NewsAccessService } from './news-access.service';

@Component({
    selector: 'jhi-news-access-detail',
    templateUrl: './news-access-detail.component.html'
})
export class NewsAccessDetailComponent implements OnInit, OnDestroy {

    news: NewsAccess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private newsService: NewsAccessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNews();
    }

    load(id) {
        this.newsService.find(id).subscribe((news) => {
            this.news = news;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNews() {
        this.eventSubscriber = this.eventManager.subscribe(
            'newsListModification',
            (response) => this.load(this.news.id)
        );
    }
}
