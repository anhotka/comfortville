/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ComfortvilleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CommentAccessDetailComponent } from '../../../../../../main/webapp/app/entities/comment/comment-access-detail.component';
import { CommentAccessService } from '../../../../../../main/webapp/app/entities/comment/comment-access.service';
import { CommentAccess } from '../../../../../../main/webapp/app/entities/comment/comment-access.model';

describe('Component Tests', () => {

    describe('CommentAccess Management Detail Component', () => {
        let comp: CommentAccessDetailComponent;
        let fixture: ComponentFixture<CommentAccessDetailComponent>;
        let service: CommentAccessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComfortvilleTestModule],
                declarations: [CommentAccessDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CommentAccessService,
                    JhiEventManager
                ]
            }).overrideTemplate(CommentAccessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentAccessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentAccessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CommentAccess(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.comment).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
