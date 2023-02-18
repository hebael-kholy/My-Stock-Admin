import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/Services/product/product.service';
import Swal from 'sweetalert2';

export interface DialogData{
  animal: string
  name: string
}
export class FormFieldHintExample {}
@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private Service:ProductService,
    private build:FormBuilder,
    private http: HttpClient,
    private router:ActivatedRoute
    ) {}
  ngOnInit(): void {
    this.form = this.build.group({
        _id:[''],
        title:['', Validators.required],
        price:['', Validators.required],
        description:['', Validators.required],
        image:['', Validators.required],
        category:['', Validators.required],
        // brand:['', Validators.required]
      });
    this.getCatergory();
    this.getSelectedCateory(event);
    // throw new Error('Method not implemented.');
  }

    onNoClick(): void {
      this.dialogRef.close();
  }
  base64:any = '';
  form!: FormGroup;
  categories:[]|any= [];
  selectedFile!: File;
  getCatergory(){
    this.Service.getAllCategories().subscribe((res:any)=>{
      this.categories = res.data;
      console.log(this.categories[2]._id);
      console.log(this.categories.name);
    })
  }

  getSelectedCateory(event:any){
    this.form.get('category')!.setValue(event.target.value);
    console.log(this.form);
  }


  getImgPath(event:any){
     // this.selectedFile = <File>event.target.files[0];
    // const file = event.target.files[0];
    const file = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload= ()=>{
        this.base64 = reader.result;
        // this.form.get('image')!.setValue(event.target.value);
      console.log(this.base64);
    }

    // const file = event.target.files[0];
    this.form.get('image')!.setValue(file);
    this.form.patchValue({
      image: file,
    });
    this.form.get('image')!.updateValueAndValidity();
    // console.log(this.form.get('image')!.updateValueAndValidity());
    // console.log(this.form.get('image')!.setValue(file));
    // console.log(this.selectedFile);
    // console.log(this.selectedFile.name);
    }

    addProduct(){
    // const model = this.form.value;
    // this.Service.createProduct(model).subscribe(res=>{
    //   })
    //   console.log(this.form);

      const formData:any = new FormData();
      formData.append('title', this.form.get('title')!.value);
      formData.append('price', this.form.get('price')!.value);
      formData.append('category', this.form.get('category')!.value);
      formData.append('description', this.form.get('description')!.value);
      // formData.append('image', this.selectedFile, this.selectedFile.name)
      formData.append('image', this.form.get('image')!.value);
      this.Service.createProduct(formData).subscribe(res=>{
      console.log(res);
      this.dialogRef.close();
      Swal.fire("Product Added successfully","","success");
      // ngAfterViewChecked(){}
      // window.location.reload();
      this.dialogRef.close();
    })
  }
  // selectedFiles?: FileList;
  // selectedFileNames: string[] = [];

  // progressInfos: any[] = [];
  // message: string[] = [];

  // previews: string[] = [];
  // imageInfos?: Observable<any>;




  // ngOnInit(): void {
  //   this.imageInfos = this.uploadService.getFiles();
  // }

  // selectFiles(event: any): void {
  //   this.message = [];
  //   this.progressInfos = [];
  //   this.selectedFileNames = [];
  //   this.selectedFiles = event.target.files;

  //   this.previews = [];
  //   if (this.selectedFiles && this.selectedFiles[0]) {
  //     const numberOfFiles = this.selectedFiles.length;
  //     for (let i = 0; i < numberOfFiles; i++) {
  //       const reader = new FileReader();

  //       reader.onload = (e: any) => {
  //         console.log(e.target.result);
  //         this.previews.push(e.target.result);
  //       };

  //       reader.readAsDataURL(this.selectedFiles[i]);

  //       this.selectedFileNames.push(this.selectedFiles[i].name);
  //     }
  //   }
  // }

  // upload(idx: number, file: File): void {
  //   this.progressInfos[idx] = { value: 0, fileName: file.name };

  //   if (file) {
  //     this.uploadService.upload(file).subscribe(
  //       (event: any) => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           this.progressInfos[idx].value = Math.round(
  //             (100 * event.loaded) / event.total
  //           );
  //         } else if (event instanceof HttpResponse) {
  //           const msg = 'Uploaded the file successfully: ' + file.name;
  //           this.message.push(msg);
  //           this.imageInfos = this.uploadService.getFiles();
  //         }
  //       },
  //       (err: any) => {
  //         this.progressInfos[idx].value = 0;
  //         const msg = 'Could not upload the file: ' + file.name;
  //         this.message.push(msg);
  //       }
  //     );
  //   }
  // }

  // uploadFiles(): void {
  //   this.message = [];

  //   if (this.selectedFiles) {
  //     for (let i = 0; i < this.selectedFiles.length; i++) {
  //       this.upload(i, this.selectedFiles[i]);
  //     }
  //   }
  // }

}

