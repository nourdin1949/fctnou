import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
   * Creates an instance of ForgotPasswordComponent.
   * @param {FormBuilder} fb
   * @param {SharedService} shared_service
   * @memberof ForgotPasswordComponent
   */
  constructor(private fb: FormBuilder, private shared_service: SharedService) {
    this.formForgotPassword = this.fb.group({
      email: ['', Validators.required],
    })
  }
  /**
   * Método recuperar contraseña con envio de correo
   */
  recuperarContrasenia() {
    if (this.formForgotPassword.valid) {
      this.shared_service.forgotpassword(this.formForgotPassword.value.email)
        .subscribe(
          () => {
            this.enviado = true
          })
    }
  }
}
