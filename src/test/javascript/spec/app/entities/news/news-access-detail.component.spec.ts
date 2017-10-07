/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ComfortvilleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { NewsAccessDetailComponent } from '../../../../../../main/webapp/app/entities/news/news-access-detail.component';
import { NewsAccessService } from '../../../../../../main/webapp/app/entities/news/news-access.service';
import { NewsAccess } from '../../../../../../main/webapp/app/entities/news/news-access.model';

describe('Component Tests', () => {

    describe('NewsAccess Management Detail Component', () => {
        let comp: NewsAccessDetailComponent;
        let fixture: ComponentFixture<NewsAccessDetailComponent>;
        let service: NewsAccessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComfortvilleTestModule],
                declarations: [NewsAccessDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    NewsAccessService,
                    JhiEventManager
                ]
            }).overrideTemplate(NewsAccessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NewsAccessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NewsAccessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new NewsAccess(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.news).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
