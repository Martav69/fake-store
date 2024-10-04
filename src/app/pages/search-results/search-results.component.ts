import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../entities/product.entity';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [ProductCardComponent, NgFor],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit{

  private readonly productService = inject(ProductService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router)

  product: Product[]

async ngOnInit(): Promise<void> {
  
  const search = this.activatedRoute.snapshot.queryParamMap.get('s')

  if (!search || search.length < 2) {
    
    this.router.navigateByUrl('/')
    return
  }
  const product = await this.productService.getAllProducts()
  this.product = product.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
}
}
