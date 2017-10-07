import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { NewsAccessComponent } from './news-access.component';
import { NewsAccessDetailComponent } from './news-access-detail.component';
import { NewsAccessPopupComponent } from './news-access-dialog.component';
import { NewsAccessDeletePopupComponent } from './news-access-delete-dialog.component';

export const newsRoute: Routes = [
    {
        path: 'news-access',
        component: NewsAccessComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'News'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'news-access/:id',
        component: NewsAccessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'News'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const newsPopupRoute: Routes = [
    {
        path: 'news-access-new',
        component: NewsAccessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'News'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'news-access/:id/edit',
        component: NewsAccessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'News'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'news-access/:id/delete',
        component: NewsAccessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'News'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
