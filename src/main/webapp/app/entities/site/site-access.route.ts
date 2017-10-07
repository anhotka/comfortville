import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SiteAccessComponent } from './site-access.component';
import { SiteAccessDetailComponent } from './site-access-detail.component';
import { SiteAccessPopupComponent } from './site-access-dialog.component';
import { SiteAccessDeletePopupComponent } from './site-access-delete-dialog.component';

export const siteRoute: Routes = [
    {
        path: 'site-access',
        component: SiteAccessComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sites'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'site-access/:id',
        component: SiteAccessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sites'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sitePopupRoute: Routes = [
    {
        path: 'site-access-new',
        component: SiteAccessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sites'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'site-access/:id/edit',
        component: SiteAccessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sites'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'site-access/:id/delete',
        component: SiteAccessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sites'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
