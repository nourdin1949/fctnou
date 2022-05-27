import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TutorEscolarService {
  public alumnos: any[] = []
  private url=environment.url;

  constructor(private http: HttpClient) {
    setTimeout(() => {
      this.listarAlumnosDelTutor()
    }, 300);
  }
  /**
     * name
     */
  public getHeaders() {
    const headers = {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }
    return headers
  }

  public listarAlumnosDelTutor():any[] {
    let idTutor = sessionStorage.getItem('id');
    console.log("buscando tareas por id")
    this.http.get<any[]>(`${this.url}/alumosTutor/${idTutor}`, this.getHeaders()).subscribe((res) => {
      this.alumnos = res
      return this.alumnos
    })
    return this.alumnos
  }
  public validarTareaTutor(idTarea:number){
    return this.http.put<any[]>(`${this.url}/validaTareaTutor/${idTarea}`,"", this.getHeaders())
  }
}
