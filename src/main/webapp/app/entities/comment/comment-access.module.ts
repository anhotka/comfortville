import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComfortvilleSharedModule } from '../../shared';
import {
    CommentAccessService,
    CommentAccessPopupService,
    CommentAccessComponent,
    CommentAccessDetailComponent,
    CommentAccessDialogComponent,
    CommentAccessPopupComponent,
    CommentAccessDeletePopupComponent,
    CommentAccessDeleteDialogComponent,
    commentRoute,
    commentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...commentRoute,
    ...commentPopupRoute,
];

@NgModule({
    imports: [
        ComfortvilleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CommentAccessComponent,
        CommentAccessDetailComponent,
        CommentAccessDialogComponent,
        CommentAccessDeleteDialogComponent,
        CommentAccessPopupComponent,
        CommentAccessDeletePopupComponent,
    ],
    entryComponents: [
        CommentAccessComponent,
        CommentAccessDialogComponent,
        CommentAccessPopupComponent,
        CommentAccessDeleteDialogComponent,
        CommentAccessDeletePopupComponent,
    ],
    providers: [
        CommentAccessService,
        CommentAccessPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComfortvilleCommentAccessModule {}
