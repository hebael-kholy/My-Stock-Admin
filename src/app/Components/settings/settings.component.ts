import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorizationService } from './../../Services/authorization/authorization.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  formValue!: FormGroup;
  urlImg: any;
  isLoading = false;
  id = localStorage.getItem('id');
  username = localStorage.getItem('name');

  constructor(
    private formBuilder: FormBuilder,
    private authorizeService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.urlImg = localStorage.getItem('image');
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      image: [null, Validators.required],
    });
  }

  uploadImgFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.urlImg = e.target.result;
      };
    }
    const file = (event.target as HTMLInputElement).files![0];
    this.formValue.patchValue({
      image: file,
    });
    this.formValue.get('image')?.updateValueAndValidity();
  }

  updateData() {
    var formData: any = new FormData();
    formData.append('name', this.formValue.get('name')?.value);
    formData.append('image', this.formValue.get('image')?.value);
    this.isLoading = true;
    this.authorizeService.updateInfo(this.id, formData).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('name', res.user.name);
        localStorage.setItem('image', res.user.image);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
