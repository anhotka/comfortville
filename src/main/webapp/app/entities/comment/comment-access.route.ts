import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CommentAccessComponent } from './comment-access.component';
import { CommentAccessDetailComponent } from './comment-access-detail.component';
import { CommentAccessPopupComponent } from './comment-access-dialog.component';
import { CommentAccessDeletePopupComponent } from './comment-access-delete-dialog.component';

export const commentRoute: Routes = [
    {
        path: 'comment-access',
        component: CommentAccessComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'comment-access/:id',
        component: CommentAccessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commentPopupRoute: Routes = [
    {
        path: 'comment-access-new',
        component: CommentAccessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comment-access/:id/edit',
        component: CommentAccessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comment-access/:id/delete',
        component: CommentAccessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
