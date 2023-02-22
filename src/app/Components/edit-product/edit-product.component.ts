import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Data } from '@angular/router';
import { ProductService } from 'src/app/Services/product/product.service';
import Swal from 'sweetalert2';
import { DialogData } from '../add-product-dialog/add-product-dialog.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Service: ProductService,
    private build: FormBuilder,
    private http: HttpClient,
    private router: ActivatedRoute
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  base64: any = '';
  form!: FormGroup;
  categories: [] | any = [];
  selectedFile!: File;
  url = this.data.image;
  categoryName = this.data.category;

  uploadImgFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };
    }
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({
      image: file,
    });
    this.form.get('image')?.updateValueAndValidity();
  }

  getCatergory() {
    this.Service.getAllCategories().subscribe((res: any) => {
      this.categories = res.data;
      console.log(this.categories);
      console.log(this.categories[2]._id);
    });
  }

  getSelectedCateory(event: any) {
    this.form.get('category')!.setValue(event.target.value);
    console.log(this.form);
  }

  ngOnInit(): void {
    console.log(this.data);
    this.form = this.build.group({
      id: this.data.id,
      title: [this.data.title, Validators.required],
      description: [this.data.description],
      price: [this.data.price],
      image: [this.data.image],
      category: [this.data.category],
    });
    console.log(this.data);
    this.getCatergory();
    this.getSelectedCateory(event);
  }

  Save() {
    const formData: any = new FormData();
    formData.append('title', this.form.get('title')!.value);
    formData.append('price', this.form.get('price')!.value);
    if (this.form.get('category')!.value !== null) {
      formData.append('category', this.form.get('category')!.value);
    } else {
      formData.append('category', this.data.category);
    }
    formData.append('description', this.form.get('description')!.value);
    formData.append('image', this.form.get('image')!.value);
    this.Service.editProduct(this.data.id, formData).subscribe((res) => {
      console.log(res);
      this.dialogRef.close();
      Swal.fire('Product Added successfully', '', 'success');
      this.dialogRef.close();
    });
  }
}
