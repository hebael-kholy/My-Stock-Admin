import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from './../../Services/categories/categories.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css'],
})
export class EditCategoryDialogComponent implements OnInit {
  formValue!: FormGroup;
  newImg: any;
  url = this.data.image;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    public categoryService: CategoriesService,
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data.image);
    this.formValue = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      image: [null, Validators.required],
    });
  }

  uploadImgFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };
    }
    const file = (event.target as HTMLInputElement).files![0];
    this.formValue.patchValue({
      image: file,
    });
    this.formValue.get('image')?.updateValueAndValidity();
  }

  EditCategory() {
    var formData: any = new FormData();
    formData.append('name', this.formValue.get('name')?.value);
    formData.append('image', this.formValue.get('image')?.value);
    this.isLoading = true;
    this.categoryService.updateCategory(this.data.slug, formData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.data.image = res.data.image;
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Category Updated Successfully',
          showConfirmButton: true,
        });
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'warning',
          title: 'Something Went Wrong!!!',
          showConfirmButton: true,
        });
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
