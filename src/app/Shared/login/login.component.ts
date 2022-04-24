import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  public arrayInicio= [{ usuario: "admin", pwd: "admin", perfil: "admin" },
  { usuario: "alumno", pwd: "alumno", perfil: "alumno" },
  { usuario: "profesor", pwd: "profesor", perfil: "profesor" },
  { usuario: "responsable", pwd: "responsable", perfil: "responsable" }]
  public formlogin: FormGroup
  public mostrarMensaje: boolean = false
  constructor(private fb: FormBuilder, private router: Router, private shareServ: SharedService) {
    this.formlogin = this.fb.group({
      usuario: ['', Validators.required],
      pwd: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  iniciarSesion(form: FormGroup) {
   
    this.arrayInicio.forEach((element) => {
      if (form.value.usuario == element.usuario && form.value.pwd==element.pwd) {
        if (element.perfil == "admin" ) {
          console.log("admin")
          this.shareServ.perfil="admin"
          localStorage.setItem("Perfil", "admin")
          this.router.navigateByUrl("/admin")
        }
        if (element.perfil == "profesor") {
          console.log("profesor")
          this.shareServ.perfil="profesor"
          localStorage.setItem("Perfil", "profesor")
          this.router.navigateByUrl("/tutorescolar")
        }
        if (element.perfil == "responsable") {
          console.log("responsable")
          this.shareServ.perfil="responsable"
          localStorage.setItem("Perfil", "responsable")
          this.router.navigateByUrl("/tutorempresa")
        }
        if (element.perfil == "alumno") {
          console.log("alumno")
          this.shareServ.perfil="alumno"
          localStorage.setItem("Perfil", "alumno")
          this.router.navigateByUrl("/alumno")
        }
      }

    })
  }
}
