import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComfortvilleSiteAccessModule } from './site/site-access.module';
import { ComfortvilleLocationAccessModule } from './location/location-access.module';
import { ComfortvillePersonAccessModule } from './person/person-access.module';
import { ComfortvilleCommentAccessModule } from './comment/comment-access.module';
import { ComfortvilleNewsAccessModule } from './news/news-access.module';
import { ComfortvilleSectionAccessModule } from './section/section-access.module';
import { ComfortvilleRateAccessModule } from './rate/rate-access.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ComfortvilleSiteAccessModule,
        ComfortvilleLocationAccessModule,
        ComfortvillePersonAccessModule,
        ComfortvilleCommentAccessModule,
        ComfortvilleNewsAccessModule,
        ComfortvilleSectionAccessModule,
        ComfortvilleRateAccessModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComfortvilleEntityModule {}
