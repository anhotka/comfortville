import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LocationAccessComponent } from './location-access.component';
import { LocationAccessDetailComponent } from './location-access-detail.component';
import { LocationAccessPopupComponent } from './location-access-dialog.component';
import { LocationAccessDeletePopupComponent } from './location-access-delete-dialog.component';

export const locationRoute: Routes = [
    {
        path: 'location-access',
        component: LocationAccessComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Locations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'location-access/:id',
        component: LocationAccessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Locations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const locationPopupRoute: Routes = [
    {
        path: 'location-access-new',
        component: LocationAccessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Locations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'location-access/:id/edit',
        component: LocationAccessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Locations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'location-access/:id/delete',
        component: LocationAccessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Locations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
