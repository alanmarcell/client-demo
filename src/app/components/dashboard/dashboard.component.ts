import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getAllProducts()
      .then(products => this.products = products);
  }

  gotoDetail(product: Product) {
    const link = ['/productDetail', product._id];
    this.router.navigate(link);
  }
}
