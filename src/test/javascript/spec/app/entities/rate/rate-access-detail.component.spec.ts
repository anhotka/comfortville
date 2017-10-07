/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ComfortvilleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RateAccessDetailComponent } from '../../../../../../main/webapp/app/entities/rate/rate-access-detail.component';
import { RateAccessService } from '../../../../../../main/webapp/app/entities/rate/rate-access.service';
import { RateAccess } from '../../../../../../main/webapp/app/entities/rate/rate-access.model';

describe('Component Tests', () => {

    describe('RateAccess Management Detail Component', () => {
        let comp: RateAccessDetailComponent;
        let fixture: ComponentFixture<RateAccessDetailComponent>;
        let service: RateAccessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComfortvilleTestModule],
                declarations: [RateAccessDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RateAccessService,
                    JhiEventManager
                ]
            }).overrideTemplate(RateAccessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RateAccessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RateAccessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new RateAccess(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.rate).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
