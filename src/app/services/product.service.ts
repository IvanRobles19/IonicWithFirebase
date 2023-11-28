import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productEdit: Product;
  private products: Observable <Product [] >;

  private productCollection: AngularFirestoreCollection<Product>;

  private productsFav: Observable <Product [] >;

  private productCollectionFav: AngularFirestoreCollection<Product>;

  constructor(private firestore:AngularFirestore) {
   // this.products.push({
     /* name: "Aguacate",
      price: 100,
      description: "Lorem ipsum dolor sit amet.",
      type: "Frutas y Verduras",
      photo: "https://picsum.photos/500/300?random",
      */
   // });
    //this.products.push({
     /*  name: "Coca Cola",
      price: 20,
      description: "Lorem ipsum dolor sit amet.",
      type: "Abarrotes",
      photo: "https://picsum.photos/500/300?random" */
    //});
    //this.products.push({
/*       name: "Jabón Zote",
      price: 40,
      description: "Lorem ipsum dolor sit amet.",
      type: "Limpieza",
      photo: "https://picsum.photos/500/300?random" */
    //});
    //this.products.push({
    //  name: "Aspirina",
      //price: 50,
//description: "Lorem ipsum dolor sit amet.",
    //  type: "Farmacia",
    //  photo: "https://picsum.photos/500/300?random"
    //});
    this.productEdit = {
       name: "Aguacate",
       price: 100,
       description: "Lorem ipsum dolor sit amet.",
       type: "Frutas y Verduras",
       photo: "https://picsum.photos/500/300?random",
      };
    this.productCollection = firestore.collection<Product>('products');
    this.productCollectionFav = firestore.collection<Product>('favorites');
    this.productsFav = this.productCollectionFav.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    //this.products = this.productCollection.valueChanges();
    this.products = this.productCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  saveProduct(product: Product): Promise<String> {
   // this.products.push(product);
   // return of(product);
   return this.productCollection.add(product)
   .then((doc)=>{
    console.log("Product added with id:" +doc.id);
    return "success";
   })
   .catch((error)=>{
    console.log("Error adding product: "+error);
    return "error";
   });

  }

  getProducts(): Observable<Product[]> {
    return this.products;
  }

  getProductsFav(): Observable<Product[]> {
    return this.productsFav;
  }

  addProductFav(product: Product): Promise<any> {
    return this.productCollectionFav.add(product);
   }

   deleteProductFav(product: Product): Promise<any> {
    return this.productCollectionFav.doc(product.id).delete();
   }

   editProduct(product: Product): Promise<String> {
    const { id, ...productData } = product;
    return new Promise<string>((resolve, reject) => {
      this.productCollection.doc(id).update(productData)
        .then(() => {
          resolve('success'); // Resuelve la promesa con 'success' en caso de éxito
        })
        .catch(error => {
          console.error('Error al actualizar el producto:', error);
          reject(error); // Rechaza la promesa con el error si hay algún problema
        });
    });
   }

   setProductEdit(product: Product){
    this.productEdit = product;
   }
    getProductEdit(): Product{
      return this.productEdit;
    }

}
