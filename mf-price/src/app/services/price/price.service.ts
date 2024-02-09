import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private http: HttpClient) { }
  erpProductData: any;
  productsToFetch = '';

  public getPriceDetails(priceApiUrl: string, products: any[]): Observable<any[]> | void {
    this.productsToFetch = '';
    products.map((product) => {
      if (product != null) {
        this.productsToFetch += '|' + product.code;
      }
    });
    if (this.productsToFetch !== '') {
      this.productsToFetch = this.productsToFetch.substring(1);
      return this.getPrice(priceApiUrl, this.productsToFetch);
    }
  }

  public getPrice(priceApiUrl: string, products: string | number | boolean): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('products', products);
      return this.http.get<any[]>(priceApiUrl, { params, withCredentials: true })
  }

}
