import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComfortvilleSharedModule } from '../../shared';
import {
    LocationAccessService,
    LocationAccessPopupService,
    LocationAccessComponent,
    LocationAccessDetailComponent,
    LocationAccessDialogComponent,
    LocationAccessPopupComponent,
    LocationAccessDeletePopupComponent,
    LocationAccessDeleteDialogComponent,
    locationRoute,
    locationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...locationRoute,
    ...locationPopupRoute,
];

@NgModule({
    imports: [
        ComfortvilleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LocationAccessComponent,
        LocationAccessDetailComponent,
        LocationAccessDialogComponent,
        LocationAccessDeleteDialogComponent,
        LocationAccessPopupComponent,
        LocationAccessDeletePopupComponent,
    ],
    entryComponents: [
        LocationAccessComponent,
        LocationAccessDialogComponent,
        LocationAccessPopupComponent,
        LocationAccessDeleteDialogComponent,
        LocationAccessDeletePopupComponent,
    ],
    providers: [
        LocationAccessService,
        LocationAccessPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComfortvilleLocationAccessModule {}
