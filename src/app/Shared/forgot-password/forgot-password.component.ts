import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public formForgotPassword: FormGroup
  public mostrarMensaje: boolean = false
  public enviado: boolean = false
  constructor(private fb: FormBuilder, private router: Router, private sharedserv: SharedService) {
    this.formForgotPassword = this.fb.group({

      email: ['', Validators.required],

    })
  }
  ngOnInit(): void {
  }
  recuperarContrasenia() {
    if (this.formForgotPassword.valid) {
      this.sharedserv.forgotpassword(this.formForgotPassword.value.email)
        .subscribe(
          () => {
        this.enviado=true
        
      })
    }
    console.log(this.formForgotPassword.value)
  }

}
