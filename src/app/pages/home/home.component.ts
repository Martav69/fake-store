import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { NgFor } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../entities/product.entity';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly productService = inject(ProductService)

  product: Product[]

  async ngOnInit(){
    this.product = await this.productService.getAllProducts()
  }
}
