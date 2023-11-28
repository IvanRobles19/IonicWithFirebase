import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage  {
  public producto : Product;
  public productFormEdit: FormGroup;
  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router) { 
    this.producto = this.productService.getProductEdit();

    this.productFormEdit = this.formBuilder.group({
      name: [this.producto.name, Validators.required],
      price: [this.producto.price, Validators.required],
      description: [this.producto.description],
      photo: [this.producto.photo],
      type: [this.producto.type, Validators.required]
    });

  }

  updateProduct(){
    console.log(this.producto.id);
    if (this.productFormEdit.valid) {
      const product = { ...this.productFormEdit.value, id: this.producto.id };
      this.productService.editProduct(product)
      .then(async(result) => {
        console.log(result);
        if(result === "success"){
          console.log('Producto actualizado exitosamente:');
        }else{
          console.error('Error al actualizar el producto: 1');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar el producto:', error);
      });
    }
    this.router.navigate(['/tabs/tab1']);
  }

}
