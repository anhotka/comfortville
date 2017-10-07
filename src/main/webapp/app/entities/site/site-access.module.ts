import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComfortvilleSharedModule } from '../../shared';
import {
    SiteAccessService,
    SiteAccessPopupService,
    SiteAccessComponent,
    SiteAccessDetailComponent,
    SiteAccessDialogComponent,
    SiteAccessPopupComponent,
    SiteAccessDeletePopupComponent,
    SiteAccessDeleteDialogComponent,
    siteRoute,
    sitePopupRoute,
} from './';

const ENTITY_STATES = [
    ...siteRoute,
    ...sitePopupRoute,
];

@NgModule({
    imports: [
        ComfortvilleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SiteAccessComponent,
        SiteAccessDetailComponent,
        SiteAccessDialogComponent,
        SiteAccessDeleteDialogComponent,
        SiteAccessPopupComponent,
        SiteAccessDeletePopupComponent,
    ],
    entryComponents: [
        SiteAccessComponent,
        SiteAccessDialogComponent,
        SiteAccessPopupComponent,
        SiteAccessDeleteDialogComponent,
        SiteAccessDeletePopupComponent,
    ],
    providers: [
        SiteAccessService,
        SiteAccessPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComfortvilleSiteAccessModule {}
