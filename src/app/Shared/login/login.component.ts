import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import { User } from '../interfaces/Interface';
import { VerificarEmailComponent } from '../verificar-email/verificar-email.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user!: User;
  public formlogin: FormGroup
  public incorrecto: boolean = false
  public cuentaDesactivada: boolean = false
  public emailVerificado: boolean = false
  constructor(private fb: FormBuilder, private router: Router, private shareServ: SharedService) {
    this.formlogin = this.fb.group({
      usuario: ['23754851D', Validators.required],
      pwd: ['12345678', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  iniciarSesion(form: FormGroup) {
    const objeto = { "username": form.value.usuario, "password": form.value.pwd }
    this.shareServ.signedIn(objeto).subscribe((response) => {

      localStorage.setItem("token", response.data.token)
      this.getuser();

    }, (error) => {
      console.log(error.error.message);
      if (error.error.message == "Unauthorised.") {
        window.alert("un")
        this.incorrecto = true
        this.cuentaDesactivada = false
      } else if (error.error.message == "Cuenta desactivada") {
        this.cuentaDesactivada = true
        this.incorrecto = false
        window.alert("desactivadfa")
      }
    })
  }

  public getuser() {
    this.shareServ.getUser().subscribe((response) => {
      this.user = response
      sessionStorage.setItem('username', this.user.username)
      if (this.user.perfil == "admin") {
        console.log("admin")
        this.shareServ.perfil = "admin"
        localStorage.setItem("Perfil", "admin")

        this.router.navigateByUrl("/admin")
      }
      if (this.user.perfil == "profesor") {
        console.log("profesor")
        this.shareServ.perfil = "profesor"
        this.shareServ.getIdUserTutor(this.user.username)
        .subscribe((res) => {
          console.log(res), sessionStorage.setItem('id', res.id)
          console.log(res), 
          console.log("guardar id en sesion")
        });
        localStorage.setItem("Perfil", "profesor")
        this.router.navigateByUrl("/tutorescolar")
      }
      if (this.user.perfil == "responsable") {
        console.log("responsable")
        this.shareServ.perfil = "responsable"
        this.shareServ.getIdUserResposable(this.user.username)
        .subscribe((res) => {
          console.log(res), sessionStorage.setItem('id', res.id)
          console.log("guardar id en sesion")
        });
        localStorage.setItem("Perfil", "responsable")
        this.router.navigateByUrl("/tutorempresa")
      }
      if (this.user.perfil == "alumno") {
        console.log("alumno")
        this.shareServ.perfil = "alumno"
        this.shareServ.getIdUserAlumno(this.user.username)
          .subscribe((res) => {
            console.log(res), sessionStorage.setItem('id', res[0].id)
            console.log("guardar id en sesion")
          });
        localStorage.setItem("Perfil", "alumno")
        this.router.navigateByUrl("/alumno")
      }
    }, (error) => {
      if (error.error.message == "Your email address is not verified.") {
        this.emailVerificado = true
        window.alert("verifcaion")
      }
    })
  }
}


