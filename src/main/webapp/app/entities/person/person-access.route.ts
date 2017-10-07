import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PersonAccessComponent } from './person-access.component';
import { PersonAccessDetailComponent } from './person-access-detail.component';
import { PersonAccessPopupComponent } from './person-access-dialog.component';
import { PersonAccessDeletePopupComponent } from './person-access-delete-dialog.component';

export const personRoute: Routes = [
    {
        path: 'person-access',
        component: PersonAccessComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'person-access/:id',
        component: PersonAccessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personPopupRoute: Routes = [
    {
        path: 'person-access-new',
        component: PersonAccessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-access/:id/edit',
        component: PersonAccessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-access/:id/delete',
        component: PersonAccessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
