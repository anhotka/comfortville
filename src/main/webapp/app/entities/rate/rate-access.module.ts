import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComfortvilleSharedModule } from '../../shared';
import {
    RateAccessService,
    RateAccessPopupService,
    RateAccessComponent,
    RateAccessDetailComponent,
    RateAccessDialogComponent,
    RateAccessPopupComponent,
    RateAccessDeletePopupComponent,
    RateAccessDeleteDialogComponent,
    rateRoute,
    ratePopupRoute,
} from './';

const ENTITY_STATES = [
    ...rateRoute,
    ...ratePopupRoute,
];

@NgModule({
    imports: [
        ComfortvilleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RateAccessComponent,
        RateAccessDetailComponent,
        RateAccessDialogComponent,
        RateAccessDeleteDialogComponent,
        RateAccessPopupComponent,
        RateAccessDeletePopupComponent,
    ],
    entryComponents: [
        RateAccessComponent,
        RateAccessDialogComponent,
        RateAccessPopupComponent,
        RateAccessDeleteDialogComponent,
        RateAccessDeletePopupComponent,
    ],
    providers: [
        RateAccessService,
        RateAccessPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComfortvilleRateAccessModule {}
