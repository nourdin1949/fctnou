import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
/**
 * The reset-password component
 */
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  /**
   * Formulario
   */
  public formResetpassword: FormGroup
  /**
   * Contraseña son o no son coinciden
   */
  public pwdDiferentes: boolean = false
  /**
   * El token
   */
  public token!: string;
  /**
   * Constructor
   * @param fb 
   * @param router 
   * @param activedRoute 
   * @param sharedserv 
   */
  constructor(private fb: FormBuilder,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private sharedserv: SharedService) {

    this.activedRoute.params.subscribe((response) => {
      this.token = response['token']
    })
    this.formResetpassword = this.fb.group({

      email: ['', Validators.required],
      pwd: ['', Validators.required],
      pwd1: ['', Validators.required]
    })
  }
  /**
   * Metodo de recuperar contraseña
   */
  recuperarContrasenia() {
    if (this.formResetpassword.value.pwd1 != this.formResetpassword.value.pwd) this.pwdDiferentes = true
    if (this.formResetpassword.valid && this.pwdDiferentes) {
      const objetoDatos: object = {
        "token": this.token,
        "email": this.formResetpassword.value.email,
        "password": this.formResetpassword.value.pwd,
        "password_confirmation": this.formResetpassword.value.pwd1
      }
      this.sharedserv.resetpassword(objetoDatos)
        .subscribe(
          () => {
            this.router.navigateByUrl("")
          })
    }
  }
} 
