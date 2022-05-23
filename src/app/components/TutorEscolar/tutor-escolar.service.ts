import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarea } from 'src/app/Shared/interfaces/Interface';

@Injectable({
  providedIn: 'root'
})
export class TutorEscolarService {
  public alumnos: any[] = []
  private url = "http://localhost:8000/api";

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

  public listarAlumnosDelTutor() {
    let idAlumno = sessionStorage.getItem('id');
    console.log("buscando tareas por id")
    this.http.get<any[]>(`${this.url}/alumosTutor/${2}`, this.getHeaders()).subscribe((res) => {
      this.alumnos = res
      console.log(this.alumnos)
    })
  }


}
