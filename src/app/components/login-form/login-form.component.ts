import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit  {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)


  form: FormGroup
  errMsg:string

  ngOnInit(): void {
    
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ])
    })
  }

  onSubmitForm(){
    if(this.form.valid){
      const {email, password} = this.form.value
      try {
        this.authService.login(email,password)
        this.router.navigateByUrl('/')
      }
      catch (e:unknown){
      this.errMsg = typeof e === 'string' ? e : "An Error Occured"
    }
  }
}
}
