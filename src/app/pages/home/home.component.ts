import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { NgFor, NgIf } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../entities/product.entity';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, NgFor, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly productService = inject(ProductService)
  private readonly router = inject(Router)

  searchForm: FormGroup

  product: Product[]

  async ngOnInit(){

    const product = await this.productService.getAllProducts()
    const randomIndex = Math.floor(Math.random() * product.length)
    this.product = product.slice(randomIndex, randomIndex + 3)


    this.searchForm = new FormGroup({
      search: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ])
    })
  }

  onSubmitSearch(){

    const { search } = this.searchForm.value
    this.router.navigate(['/search-results'], { queryParams: {s: search}})
  }
}
