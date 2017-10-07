import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CommentAccess } from './comment-access.model';
import { CommentAccessService } from './comment-access.service';

@Component({
    selector: 'jhi-comment-access-detail',
    templateUrl: './comment-access-detail.component.html'
})
export class CommentAccessDetailComponent implements OnInit, OnDestroy {

    comment: CommentAccess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private commentService: CommentAccessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComments();
    }

    load(id) {
        this.commentService.find(id).subscribe((comment) => {
            this.comment = comment;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'commentListModification',
            (response) => this.load(this.comment.id)
        );
    }
}
