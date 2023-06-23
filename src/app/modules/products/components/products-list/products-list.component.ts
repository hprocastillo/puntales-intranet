import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../interfaces/product";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  @Input() listProducts: Product[] = [];
  @Output() outTemplate = new EventEmitter<string>();
  @Output() productToDelete = new EventEmitter<Product>();
  @Output() productToEdit = new EventEmitter<Product>();

  getTemplate(template: string) {
    this.outTemplate.emit(template);
  }

  deleteProduct(product: Product) {
    this.productToDelete.emit(product);
  }

  editProduct(product: Product) {
    this.productToEdit.emit(product);
  }
}
