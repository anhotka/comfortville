import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CommentAccess } from './comment-access.model';
import { CommentAccessPopupService } from './comment-access-popup.service';
import { CommentAccessService } from './comment-access.service';
import { PersonAccess, PersonAccessService } from '../person';
import { SiteAccess, SiteAccessService } from '../site';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-comment-access-dialog',
    templateUrl: './comment-access-dialog.component.html'
})
export class CommentAccessDialogComponent implements OnInit {

    comment: CommentAccess;
    isSaving: boolean;

    people: PersonAccess[];

    sites: SiteAccess[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private commentService: CommentAccessService,
        private personService: PersonAccessService,
        private siteService: SiteAccessService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService
            .query({filter: 'comment-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.comment.personId) {
                    this.people = res.json;
                } else {
                    this.personService
                        .find(this.comment.personId)
                        .subscribe((subRes: PersonAccess) => {
                            this.people = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.siteService
            .query({filter: 'comment-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.comment.siteId) {
                    this.sites = res.json;
                } else {
                    this.siteService
                        .find(this.comment.siteId)
                        .subscribe((subRes: SiteAccess) => {
                            this.sites = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.comment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.commentService.update(this.comment));
        } else {
            this.subscribeToSaveResponse(
                this.commentService.create(this.comment));
        }
    }

    private subscribeToSaveResponse(result: Observable<CommentAccess>) {
        result.subscribe((res: CommentAccess) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CommentAccess) {
        this.eventManager.broadcast({ name: 'commentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackPersonById(index: number, item: PersonAccess) {
        return item.id;
    }

    trackSiteById(index: number, item: SiteAccess) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-comment-access-popup',
    template: ''
})
export class CommentAccessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentPopupService: CommentAccessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.commentPopupService
                    .open(CommentAccessDialogComponent as Component, params['id']);
            } else {
                this.commentPopupService
                    .open(CommentAccessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
