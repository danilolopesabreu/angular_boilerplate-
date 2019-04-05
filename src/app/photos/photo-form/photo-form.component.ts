import { Router } from '@angular/router';
import { PhotoService } from './../photo/photo.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {
  
  photoForm: FormGroup;
  file:File;
  preview:string;

  constructor(private formBuilder: FormBuilder,
    private photoService:PhotoService,
    private router:Router) { }

  ngOnInit(): void { 

      this.photoForm = this.formBuilder.group({
          file: ['', Validators.required],
          description: ['', Validators.maxLength(300)],
          allowComments: [true]
      });
  }

  upload(){
    const desc = this.photoForm.get('description').value;
    const allow = this.photoForm.get('allowComments').value;
    this.photoService
      .upload(desc, allow, this.file)
      .subscribe(()=>this.router.navigate(['']));
  }

  handleFile(file:File){
    this.file = file;
    const reader = new FileReader();

    /*
    Call back do readAsDataURL, disparado no momento da chamada do readAsDataURL
    */
    reader.onload = (event:any) => this.preview = event.target.result;
  
    /**
     * 
     */
    reader.readAsDataURL(file);
  }

}

