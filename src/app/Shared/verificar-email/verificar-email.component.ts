import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { User } from '../../utils/interfaces/Interface';
import { SharedService } from '../shared.service';
/**
 * Verificar email component
 */
@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrls: ['./verificar-email.component.css']
})
export class VerificarEmailComponent implements OnInit {
  /**
   * Lista usuarios
   */
  public users: User[]
  /**
   * Formulario 
   */
  public formVerificacion: FormGroup
  /**
   * sesion incorrecta
   */
  public incorrecto: boolean = false;
  /**
   * Verificacion email
   */
  public verificado: boolean = false;
  /**
   * Subject para 
   */
  public debounce: Subject<string> = new Subject<string>()
  /**
   * Constructor
   * @param sharedservice 
   * @param fb 
   * @param router 
   */
  constructor(private sharedservice: SharedService, private fb: FormBuilder, private router: Router) {
    this.formVerificacion = this.fb.group({
      usuario: ['', Validators.required],
      pwd: ['', Validators.required],
      email: ['', Validators.required]
    })
  }
  /**
   * NgOnInit
   */
  ngOnInit(): void {
    this.debounce.pipe(
      debounceTime(3000)
    ).subscribe(
      resp => this.router.navigateByUrl('')
    )
  }
  /**
   * Verificar email si formulario es correcto
   */
  public verificarEmail() {
    const objeto = {
      "email": this.formVerificacion.value.email,
      "username": this.formVerificacion.value.usuario,
      "password": this.formVerificacion.value.pwd,
    }
    if (this.formVerificacion.valid) {
      this.sharedservice.verificarEmail(objeto)
        .subscribe(
          () => {
            this.verificado = true
            this.debounce.next("siguiente")
          },
          () => {
            this.incorrecto = true
          })
    }
  }
}
