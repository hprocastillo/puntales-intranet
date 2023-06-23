import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {AuthService} from "../../../../services/auth.service";
import {Product} from "../../interfaces/product";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss']
})
export class ProductsHomeComponent implements OnInit, OnDestroy {

  /** VARIABLES **/
  productSelected: Product = {} as Product;
  listProducts: Product[] = [];
  template: string = 'LIST';
  private unsubscribe$ = new Subject<boolean>();

  constructor(
    public authService: AuthService,
    private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.listProducts = res;
      });
  }

  getTemplate(template: string) {
    this.template = template;
  }

  getEditProduct(product: Product) {
    this.productSelected = product;
    this.template = 'EDIT';
  }

  async getDeleteProduct(product: Product) {
    try {
      await this.productService.deleteProduct(product);
    } catch (e) {
      console.log(e);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
