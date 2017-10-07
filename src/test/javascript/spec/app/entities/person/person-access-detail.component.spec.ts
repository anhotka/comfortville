/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ComfortvilleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PersonAccessDetailComponent } from '../../../../../../main/webapp/app/entities/person/person-access-detail.component';
import { PersonAccessService } from '../../../../../../main/webapp/app/entities/person/person-access.service';
import { PersonAccess } from '../../../../../../main/webapp/app/entities/person/person-access.model';

describe('Component Tests', () => {

    describe('PersonAccess Management Detail Component', () => {
        let comp: PersonAccessDetailComponent;
        let fixture: ComponentFixture<PersonAccessDetailComponent>;
        let service: PersonAccessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComfortvilleTestModule],
                declarations: [PersonAccessDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PersonAccessService,
                    JhiEventManager
                ]
            }).overrideTemplate(PersonAccessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonAccessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonAccessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PersonAccess(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.person).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
