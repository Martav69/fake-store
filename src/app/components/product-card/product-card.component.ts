import { Component, Input } from '@angular/core';
import { Product } from '../../entities/product.entity';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input({required:true}) 
  product: Product

}
