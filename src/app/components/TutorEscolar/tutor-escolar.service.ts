import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
/**
 * The tutor escolar service
 */
@Injectable({
  providedIn: 'root'
})
export class TutorEscolarService {
  /**
   * Url de la api
   */
  private url=environment.url;
  /**
   * Constructor
   * @param http 
   */
  constructor(private http: HttpClient) {}
  /**
   * Cabecera de las peticiones
   * @returns 
   */
  public getHeaders() {
    const headers = {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }
    return headers
  }
  /**
   * Metodo listar alumnos del tutor
   * @returns 
   */
  public listarAlumnosDelTutor():Observable<any[]> {
    let idTutor = sessionStorage.getItem('id');
    
   return this.http.get<any[]>(`${this.url}/alumosTutor/${idTutor}`, this.getHeaders())
    
  }
  /**
   * Metodo validar tareas alumno
   * @param idTarea 
   * @returns 
   */
  public validarTareaTutor(idTarea:number){
    return this.http.put<any[]>(`${this.url}/validaTareaTutor/${idTarea}`,"", this.getHeaders())
  }
}
