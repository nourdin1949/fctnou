import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public perfil = ""
  constructor() { }

  authAlumno() {
    if (localStorage.getItem("Perfil") == "alumno")
      return true
    return false
  }
  authResponsable() {
    if (localStorage.getItem("Perfil") == "responsable")
      return true
    return false
  }
  authAdmin() {
    if (localStorage.getItem("Perfil") == "admin")
      return true
    return false
  }
  authProfesor() {
    if (localStorage.getItem("Perfil") == "profesor")
      return true
    return false
  }
  islogged() {
    console.log(localStorage.getItem("Perfil"))
    if (localStorage.getItem("Perfil"))
      return true
    return false
  }
}
