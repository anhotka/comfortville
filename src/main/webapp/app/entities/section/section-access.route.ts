import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SectionAccessComponent } from './section-access.component';
import { SectionAccessDetailComponent } from './section-access-detail.component';
import { SectionAccessPopupComponent } from './section-access-dialog.component';
import { SectionAccessDeletePopupComponent } from './section-access-delete-dialog.component';

export const sectionRoute: Routes = [
    {
        path: 'section-access',
        component: SectionAccessComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sections'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'section-access/:id',
        component: SectionAccessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sections'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sectionPopupRoute: Routes = [
    {
        path: 'section-access-new',
        component: SectionAccessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sections'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'section-access/:id/edit',
        component: SectionAccessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sections'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'section-access/:id/delete',
        component: SectionAccessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sections'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
