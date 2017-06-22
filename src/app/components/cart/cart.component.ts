import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ICart, Cart } from '../../models/cart';
import { Router } from '@angular/router';
import R from 'ramda';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})

export class CartComponent implements OnInit, OnChanges {

  @Input() cart: ICart = new Cart();
  products: Product[] = [];
  selectedProduct: Product;
  message = '';
  error: any;
  items = 5;
  numProd: number;
  start = 0;

  constructor(
    private router: Router,
    private productService: ProductService) { }

  getProducts(startIndex: number, numItems: number) {
    this.productService.getProducts(startIndex, numItems).then(products => {
      this.products = products;
    });
  }

  getAllProducts() {
    this.productService.getAllProducts().then(products => {
      this.numProd = products.length;
      if (!this.numProd) {
        this.error = 'No products yet';
      }
    });

  }

  ngOnInit() {
    this.getAllProducts();
    this.getProducts(this.start, this.items);
  }

  ngOnChanges() {
    console.log('onchange start ', this.start, ' itens ', this.items);
    this.getProducts(this.start, this.items);
  }

  onSelect(product: Product) { this.selectedProduct = product; }

  idEq = (prod) => R.propEq('_id', prod._id)

  addToCart(selectedProduct: Product, quantity: number) {
    const p = R.find(this.idEq(selectedProduct))(this.cart.productList);
    selectedProduct.quantity = quantity;
    selectedProduct.subTotal = selectedProduct.quantity * selectedProduct.price;
    if (p) {
      this.getTotal();
      return;
    };
    this.cart.productList.push(selectedProduct);
    this.getTotal();
  }

  removeFromCart(selectedProduct: Product) {
    this.cart.productList = R.remove(R.findIndex(R.propEq('_id', selectedProduct._id))(this.cart.productList), 1, this.cart.productList)
    this.getTotal();
  }

  getTotal() {
    this.cart.total = 0;
    this.cart.productList.map(p => { this.cart.total += p.subTotal })
    console.log('TOTAL :::', this.cart.total);
  }

  submitCart() {
    console.log(this.cart);
  }

  next() {
    this.start += this.items;
    this.getProducts(this.start, this.items);
  }

  prev() {
    this.start -= this.items;
    this.getProducts(this.start, this.items);
  }
}
