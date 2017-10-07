import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComfortvilleSharedModule } from '../../shared';
import {
    SectionAccessService,
    SectionAccessPopupService,
    SectionAccessComponent,
    SectionAccessDetailComponent,
    SectionAccessDialogComponent,
    SectionAccessPopupComponent,
    SectionAccessDeletePopupComponent,
    SectionAccessDeleteDialogComponent,
    sectionRoute,
    sectionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...sectionRoute,
    ...sectionPopupRoute,
];

@NgModule({
    imports: [
        ComfortvilleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SectionAccessComponent,
        SectionAccessDetailComponent,
        SectionAccessDialogComponent,
        SectionAccessDeleteDialogComponent,
        SectionAccessPopupComponent,
        SectionAccessDeletePopupComponent,
    ],
    entryComponents: [
        SectionAccessComponent,
        SectionAccessDialogComponent,
        SectionAccessPopupComponent,
        SectionAccessDeleteDialogComponent,
        SectionAccessDeletePopupComponent,
    ],
    providers: [
        SectionAccessService,
        SectionAccessPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComfortvilleSectionAccessModule {}
