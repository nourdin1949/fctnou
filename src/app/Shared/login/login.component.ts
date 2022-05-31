import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { User } from '../interfaces/Interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user!: User;
  public passkeyup: boolean = false
  public userkeyup: boolean = false
  public formlogin: FormGroup
  public incorrecto: boolean = false
  public cuentaDesactivada: boolean = false
  public emailVerificado: boolean = false
  constructor(private fb: FormBuilder, private router: Router, private shareServ: SharedService) {
    this.formlogin = this.fb.group({
      usuario: ['', Validators.required],
      pwd: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.shareServ.altaAdmin()
  }
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
            if (error.error.message == "Unauthorised.") {
              this.incorrecto = true
            } else if (error.error.message == "Cuenta desactivada") {
              this.cuentaDesactivada = true
            }
          })
    }
  }

  public getuser() {
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

  public restaurarValores() {
    this.cuentaDesactivada = false;
    this.userkeyup = false;
    this.passkeyup = false;
    this.incorrecto = false;
    this.emailVerificado = false
  }
  public metodoAdmin() {
    localStorage.setItem("Perfil", "admin")
    this.router.navigateByUrl("/admin")
  }
  public metodoResponsable() {
    this.shareServ.getIdUserResposable(this.user.username)
      .subscribe(
        (res) => {
          sessionStorage.setItem('id', res.id)
        });
    localStorage.setItem("Perfil", "responsable")
    this.router.navigateByUrl("/tutorempresa")
  }
  public metodoAlumno() {
    this.shareServ.getIdUserAlumno(this.user.username)
      .subscribe(
        (res) => {
          sessionStorage.setItem('id', res[0].id)
        });
    localStorage.setItem("Perfil", "alumno")
    this.router.navigateByUrl("/alumno")
  }
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


