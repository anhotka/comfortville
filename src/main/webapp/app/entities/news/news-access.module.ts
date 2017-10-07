import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComfortvilleSharedModule } from '../../shared';
import {
    NewsAccessService,
    NewsAccessPopupService,
    NewsAccessComponent,
    NewsAccessDetailComponent,
    NewsAccessDialogComponent,
    NewsAccessPopupComponent,
    NewsAccessDeletePopupComponent,
    NewsAccessDeleteDialogComponent,
    newsRoute,
    newsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...newsRoute,
    ...newsPopupRoute,
];

@NgModule({
    imports: [
        ComfortvilleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        NewsAccessComponent,
        NewsAccessDetailComponent,
        NewsAccessDialogComponent,
        NewsAccessDeleteDialogComponent,
        NewsAccessPopupComponent,
        NewsAccessDeletePopupComponent,
    ],
    entryComponents: [
        NewsAccessComponent,
        NewsAccessDialogComponent,
        NewsAccessPopupComponent,
        NewsAccessDeleteDialogComponent,
        NewsAccessDeletePopupComponent,
    ],
    providers: [
        NewsAccessService,
        NewsAccessPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComfortvilleNewsAccessModule {}
