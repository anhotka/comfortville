/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ComfortvilleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SiteAccessDetailComponent } from '../../../../../../main/webapp/app/entities/site/site-access-detail.component';
import { SiteAccessService } from '../../../../../../main/webapp/app/entities/site/site-access.service';
import { SiteAccess } from '../../../../../../main/webapp/app/entities/site/site-access.model';

describe('Component Tests', () => {

    describe('SiteAccess Management Detail Component', () => {
        let comp: SiteAccessDetailComponent;
        let fixture: ComponentFixture<SiteAccessDetailComponent>;
        let service: SiteAccessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComfortvilleTestModule],
                declarations: [SiteAccessDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SiteAccessService,
                    JhiEventManager
                ]
            }).overrideTemplate(SiteAccessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SiteAccessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SiteAccessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SiteAccess(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.site).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
