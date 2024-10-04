import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


export interface LoginFormContent {
  email: string
  password : string
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})


export class LoginFormComponent implements OnInit  {



  @Input()errMsg?:string

  @Output() formSubmitted: EventEmitter<LoginFormContent> = new EventEmitter<LoginFormContent>()
  
  form: FormGroup

  ngOnInit(): void {
    
    this.form = new FormGroup({
      email: new FormControl('john@mail.com', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('changeme', [
        Validators.required,
        Validators.minLength(4),
      ])
    })
  }

  async onSubmitForm():Promise<void> {
    if(this.form.valid){
      const {email, password} = this.form.value
      this.formSubmitted.emit({email,password})
    }
  }
}
