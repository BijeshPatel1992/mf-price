import { TestBed } from '@angular/core/testing';
import { PriceService } from './price.service';
import { WINDOW } from '../window-fatory/winndow-factory';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PriceService', () => {
    let service: PriceService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: WINDOW, useValue: window }],
            imports: [TranslateModule.forRoot(), HttpClientTestingModule],
        });
        service = TestBed.inject(PriceService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getPriceDetails', () => {
        spyOn(service, 'getPrice').and.returnValue(of([]));
        service.getPriceDetails('url', [{ code: 'code' }]).subscribe((result) => {
            expect(result).toEqual([]);
        });
    });

    it('should call getPrice', () => {
        service.getPrice('url', 'code').subscribe((result) => {
            expect(result).toEqual([]);
        });
        const req = httpMock.expectOne('url?products=code');
        expect(req.request.method).toEqual('GET');
        req.flush([]);
    });
});
 
 