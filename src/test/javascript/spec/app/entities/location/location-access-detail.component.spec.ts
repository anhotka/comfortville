/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ComfortvilleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LocationAccessDetailComponent } from '../../../../../../main/webapp/app/entities/location/location-access-detail.component';
import { LocationAccessService } from '../../../../../../main/webapp/app/entities/location/location-access.service';
import { LocationAccess } from '../../../../../../main/webapp/app/entities/location/location-access.model';

describe('Component Tests', () => {

    describe('LocationAccess Management Detail Component', () => {
        let comp: LocationAccessDetailComponent;
        let fixture: ComponentFixture<LocationAccessDetailComponent>;
        let service: LocationAccessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComfortvilleTestModule],
                declarations: [LocationAccessDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LocationAccessService,
                    JhiEventManager
                ]
            }).overrideTemplate(LocationAccessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LocationAccessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationAccessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new LocationAccess(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.location).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
