/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ComfortvilleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SectionAccessDetailComponent } from '../../../../../../main/webapp/app/entities/section/section-access-detail.component';
import { SectionAccessService } from '../../../../../../main/webapp/app/entities/section/section-access.service';
import { SectionAccess } from '../../../../../../main/webapp/app/entities/section/section-access.model';

describe('Component Tests', () => {

    describe('SectionAccess Management Detail Component', () => {
        let comp: SectionAccessDetailComponent;
        let fixture: ComponentFixture<SectionAccessDetailComponent>;
        let service: SectionAccessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComfortvilleTestModule],
                declarations: [SectionAccessDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SectionAccessService,
                    JhiEventManager
                ]
            }).overrideTemplate(SectionAccessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SectionAccessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SectionAccessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SectionAccess(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.section).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
