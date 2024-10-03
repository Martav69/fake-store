import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductHttp } from '../../entities/product.entity';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly http = inject(HttpClient)

  private readonly apiUrl = 'https://api.escuelajs.co/api/v1/products'


  async getAllProducts():Promise<Product[]>{

    const req = this.http.get<ProductHttp[]>(this.apiUrl)
    const productHttp = await lastValueFrom(req)

    return productHttp.map(pHttp => Product.fromHttp(pHttp))

  }
}
