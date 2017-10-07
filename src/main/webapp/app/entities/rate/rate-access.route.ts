import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RateAccessComponent } from './rate-access.component';
import { RateAccessDetailComponent } from './rate-access-detail.component';
import { RateAccessPopupComponent } from './rate-access-dialog.component';
import { RateAccessDeletePopupComponent } from './rate-access-delete-dialog.component';

export const rateRoute: Routes = [
    {
        path: 'rate-access',
        component: RateAccessComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rates'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rate-access/:id',
        component: RateAccessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rates'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ratePopupRoute: Routes = [
    {
        path: 'rate-access-new',
        component: RateAccessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rate-access/:id/edit',
        component: RateAccessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rate-access/:id/delete',
        component: RateAccessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
