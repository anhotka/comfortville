import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComfortvilleSharedModule } from '../../shared';
import { ComfortvilleAdminModule } from '../../admin/admin.module';
import {
    PersonAccessService,
    PersonAccessPopupService,
    PersonAccessComponent,
    PersonAccessDetailComponent,
    PersonAccessDialogComponent,
    PersonAccessPopupComponent,
    PersonAccessDeletePopupComponent,
    PersonAccessDeleteDialogComponent,
    personRoute,
    personPopupRoute,
} from './';

const ENTITY_STATES = [
    ...personRoute,
    ...personPopupRoute,
];

@NgModule({
    imports: [
        ComfortvilleSharedModule,
        ComfortvilleAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PersonAccessComponent,
        PersonAccessDetailComponent,
        PersonAccessDialogComponent,
        PersonAccessDeleteDialogComponent,
        PersonAccessPopupComponent,
        PersonAccessDeletePopupComponent,
    ],
    entryComponents: [
        PersonAccessComponent,
        PersonAccessDialogComponent,
        PersonAccessPopupComponent,
        PersonAccessDeleteDialogComponent,
        PersonAccessDeletePopupComponent,
    ],
    providers: [
        PersonAccessService,
        PersonAccessPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComfortvillePersonAccessModule {}
