````html

<div class="progress-bar">
  <div class="progress"></div>
</div>
````

````css
.progress-bar {
  width: 100%;
  height: 20px;
  border-radius: 10px;
  background-color: #f2f2f2;
}

.progress {
  width: 0%;
  height: 100%;
  border-radius: 10px;
  background-color: #4CAF50;
  transition: width 0.5s ease-in-out;
}

````
````javascript
document.querySelector('.progress').style.width = '50%';
````
````angular2html
<div class="container">
  <form (ngSubmit)="onSubmit()">
    <div class="form-group">
      <label for="name">Nome do produto:</label>
      <input type="text" class="form-control" id="name" name="name" [(ngModel)]="product.name" required>
    </div>
    <div class="form-group">
      <label for="description">Descrição do produto:</label>
      <textarea class="form-control" id="description" name="description" [(ngModel)]="product.description" required></textarea>
    </div>
    <div class="form-group">
      <label for="price">Preço do produto:</label>
      <input type="number" class="form-control" id="price" name="price" [(ngModel)]="product.price" required>
    </div>
    <button type="submit" class="btn btn-primary">Cadastrar</button>
  </form>
  <div *ngIf="uploading">
    <div class="progress">
      <div class="progress-bar" role="progressbar" [style.width]="progress + '%'" aria-valuenow="{{progress}}" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <p>{{progress}}% concluído</p>
  </div>
</div>

````
````css
.progress {
  height: 20px;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin-bottom: 20px;
}

.progress-bar {
  height: 100%;
  background-color: #4CAF50;
  border-radius: 10px;
  transition: width 0.5s ease-in-out;
}

````
````ts
import { Component } from '@angular/core';
import { ProductService } from './product.service';

interface Product {
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  product: Product = { name: '', description: '', price: 0 };
  uploading = false;
  progress = 0;

  constructor(private productService: ProductService) { }

  onSubmit() {
    this.uploading = true;
    this.progress = 0;
    this.productService.createProduct(this.product).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          console.log('Produto cadastrado com sucesso!', event.body);
          this.uploading = false;
          this.progress = 0;
        }
      },
      error => {
        console.error('Erro ao cadastrar produto', error);
        this.uploading = false;
        this.progress = 0;
      }
    );
  }
}

````
