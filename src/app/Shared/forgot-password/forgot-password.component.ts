import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
/**
 * The forgot password component
 */
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  /**
   * Formulario
   */
  public formForgotPassword: FormGroup
  /**
   * Email enviado
   */
  public enviado: boolean = false
  /**
   * Constructor
   * @param fb 
   * @param router 
   * @param sharedserv 
   */
  constructor(private fb: FormBuilder, private router: Router, private sharedserv: SharedService) {
    this.formForgotPassword = this.fb.group({
      email: ['', Validators.required],
    })
  }
  /**
   * Método recuperar contraseña con envio de correo
   */
  recuperarContrasenia() {
    if (this.formForgotPassword.valid) {
      this.sharedserv.forgotpassword(this.formForgotPassword.value.email)
        .subscribe(
          () => {
            this.enviado = true
          })
    }
  }
}
