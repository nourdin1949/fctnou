import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import * as moment from "moment"
import { User } from '../../utils/interfaces/Interface';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public user: User = { "id": 0, "username": "", "email": "", "perfil": "", "activo": 0, "email_verified_at": "", "foto": 0, }
  public date = moment(moment.now()).format("YYYY-MM-DD")
  public nombre: string = ""
  public url: string = ""
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

    let id: any = sessionStorage.getItem("user")
  
  }

  ngOnInit(): void {

  }

  logout() {
    this.shareServ.logout().subscribe()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem(`id`)
  }

}
