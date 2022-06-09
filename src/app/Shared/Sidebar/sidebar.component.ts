import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import * as moment from "moment"
import { User } from '../../utils/interfaces/Interface';
import { environment } from 'src/environments/environment';
/**
 * The sidebar component
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  /**
   * Usuario registrado
   */
  public user: User = { "id": 0, "username": "", "email": "", "perfil": "", "activo": 0, "email_verified_at": "", "foto": 0, }
  /**
   * URL imagen perfil
   */
  public imagen= environment.imagen
  /**
   * Fecha Actual
   */
  public date = moment(moment.now()).format("YYYY-MM-DD")
  /**
   * Nombre usuarioo registrado
   */
  public nombre: string = ""
  /**
   * Modo oscuro acxtivo
   */
  public modoOscuro: boolean = false
  /**
   * Modo claro activo
   */
  public modoClaro: boolean = false
  /**
   * Contructor
   * @param shareServ 
   */
  public constructor(private shareServ: SharedService) {
    this.shareServ.getUser().subscribe(
      (response) => {
        this.user = response
        if (this.user.perfil == "responsable")
          this.shareServ.getNombreResponsable(this.user.username)
            .subscribe(
              (res) => {
                this.nombre = res.nombreResponsable
              })

        if (this.user.perfil == "alumno")
          this.shareServ.getNombreAlumno(this.user.username)
            .subscribe(
              (res) =>
                this.nombre = res.nombreAlumno
            )
        if (this.user.perfil == "profesor")
          this.shareServ.getNombreProfesor(this.user.username)
            .subscribe(
              (res) =>
                this.nombre = res.nombreTutor
            )
      })
      if(localStorage.getItem("modo")=="oscuro") {
        this.modoOscuro=true; 
        this.modoClaro=false
      }else{
        this.modoClaro=true
        this.modoOscuro=false
      }
        
  }
  /**
   * Cerrar sesión
   */
  public logout() {
    this.shareServ.logout().subscribe()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem(`id`)
  }
  /**
   * Modo oscuro
   */
  public cambiarModo() {
    if (localStorage.getItem("modo") == "claro") {
      document.getElementsByTagName("body")[0].style.backgroundColor = "gray";
      (<HTMLElement>document.getElementsByClassName("sidebar")[0]).style.backgroundColor = "gray";
      (<HTMLElement>document.getElementsByClassName("sidebar")[1]).style.backgroundColor = "gray";
      (<HTMLElement>document.getElementById("menu")).classList.remove("bg-light");
      (<HTMLElement>document.getElementById("menu")).style.backgroundColor = "gray";
      localStorage.setItem("modo", "oscuro")
      this.modoOscuro=true
      this.modoClaro=false
    } else if (localStorage.getItem("modo") == "oscuro") {
      localStorage.setItem("modo", "claro")
      this.modoClaro=true
      this.modoOscuro=false
      document.getElementsByTagName("body")[0].style.backgroundColor = "";
      (<HTMLElement>document.getElementsByClassName("sidebar")[0]).style.backgroundColor = "";
      (<HTMLElement>document.getElementsByClassName("sidebar")[1]).style.backgroundColor = "";
      (<HTMLElement>document.getElementById("menu")).classList.add("bg-light");
      (<HTMLElement>document.getElementById("menu")).style.backgroundColor = "";
    }
  }
}
