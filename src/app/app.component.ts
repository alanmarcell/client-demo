import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'H4';
  constructor(private authenticateService: AuthService,
    private productService: ProductService) { }

  logout() {
    this.authenticateService.logout();
  }

  seed() {
    console.log('seed CALLED');
    this.productService.seed().then(products => {
      console.log('seed callback');
    });

  }
}
