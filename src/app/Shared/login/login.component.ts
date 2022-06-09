import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { User } from '../../utils/interfaces/Interface';
/**
 * The login component
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   * User registrado
   */
  public user!: User;
  /**
   * when left the field password
   */
  public passkeyup: boolean = false
  /**
   * when left the field username
   */
  public userkeyup: boolean = false
  /**
   * Formulario
   */
  public formlogin: FormGroup
  /**
   * Inicio de sesion incorrecto
   */
  public incorrecto: boolean = false
  /**
   * Cuentra desactivada
   */
  public cuentaDesactivada: boolean = false
  /**
   * Email sin verificiar/ o verificado
   */
  public emailVerificado: boolean = false
  /**
   * Constructor
   * @param fb 
   * @param router 
   * @param shareServ 
   */
  constructor(private fb: FormBuilder, private router: Router, private shareServ: SharedService) {
    this.formlogin = this.fb.group({
      usuario: ['', Validators.required],
      pwd: ['', Validators.required]
    })
  }
  /**
   * NgOnInit
   */
  ngOnInit(): void {
    this.shareServ.altaAdmin()
  }
  /**
   * Metodo de inicio de sesion
   * @param form 
   */
  public iniciarSesion(form: FormGroup) {
    this.restaurarValores()
    const objeto = { "username": form.value.usuario, "password": form.value.pwd }
    if (this.formlogin.valid) {
      this.shareServ.signedIn(objeto)
        .subscribe(
          (response) => {
            console.log(response)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            this.getuser();
          },
          (error) => {
            console.log(error)
            if (error.error.message == "Unauthorised.") {
              this.incorrecto = true
            } else if (error.error.message == "Cuenta desactivada") {
              this.cuentaDesactivada = true
            }
          })
    }
  }
  /**
   * Método de obtener usuario contectado
   */
  private getuser() {
    this.shareServ.getUser().subscribe(
      (response) => {
        this.user = response
        sessionStorage.setItem('user', JSON.stringify(this.user))
        sessionStorage.setItem('username', this.user.username)
        switch (this.user.perfil) {
          case 'admin': this.metodoAdmin()
            break;
          case 'profesor': this.metodoProfesor()
            break;
          case 'responsable': this.metodoResponsable()
            break;
          case 'alumno': this.metodoAlumno()
            break;
        }
      },
      (error) => {
        if (error.error.message == "Your email address is not verified.") {
          this.emailVerificado = true
        }
      })
  }
  /**
   * Restaurar valores de validaciones
   */
  public restaurarValores() {
    this.cuentaDesactivada = false;
    this.userkeyup = false;
    this.passkeyup = false;
    this.incorrecto = false;
    this.emailVerificado = false
  }
  /**
   * Metodo redirige a la ruta admin
   */
  public metodoAdmin() {
    localStorage.setItem("Perfil", "admin")
    this.router.navigateByUrl("/admin")
  }
  /**
   * Metodo redirige a la ruta responsable
   */
  public metodoResponsable() {
    this.shareServ.getIdUserResposable(this.user.username)
      .subscribe(
        (res) => {
          sessionStorage.setItem('id', res.id)
        });
    localStorage.setItem("Perfil", "responsable")
    this.router.navigateByUrl("/tutorempresa")
  }
  /**
   * Metodo redirige a la ruta alumno
   */
  public metodoAlumno() {
    this.shareServ.getIdUserAlumno(this.user.username)
      .subscribe(
        (res) => {
          sessionStorage.setItem('id', res[0].id)
        });
    localStorage.setItem("Perfil", "alumno")
    this.router.navigateByUrl("/alumno")
  }
  /**
   * Metodo redirige a la ruta tutor
   */
  public metodoProfesor() {
    this.shareServ.getIdUserTutor(this.user.username)
      .subscribe(
        (res) => {
          sessionStorage.setItem('id', res.id)
        });
    localStorage.setItem("Perfil", "profesor")
    this.router.navigateByUrl("/tutorescolar")
  }
}


