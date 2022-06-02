import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarea } from 'src/app/utils/interfaces/Interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AnexoVService {

  private url=environment.url;
  constructor(private http: HttpClient) {

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
  public insertarAnexoV(objeto:object) {
    return this.http.post(`${this.url}/insertarTareas`, objeto, this.getHeaders());
  }
  public listarAlumnos() {
    let idAlumno= sessionStorage.getItem('id');
    console.log("buscando tareas por id")
    return this.http.get<Tarea[]>(`${this.url}/listarTareasPorIDAlumno/${idAlumno}`, this.getHeaders());
  }
  public listarTareasPorID(id:number) {
    
    return this.http.get<Tarea[]>(`${this.url}/listarTareasPorID/${id}`, this.getHeaders());
  }
  public listarTareasEntreFechas(objeto, idAlumno) {
    
    return this.http.post<Tarea[]>(`${this.url}/listarTareasEntreFechas/${idAlumno}`,objeto, this.getHeaders());
  }
  
  public fichasemanal(){
    let idAlumno= sessionStorage.getItem('id');
    return this.http.get<Tarea[]>(`${this.url}/fichasemanal/${idAlumno}`, this.getHeaders());
  }
  
  public eliminarTarea(id:number){
    return this.http.delete<Tarea[]>(`${this.url}/eliminarTareaAlumno/${id}`, this.getHeaders());
    
  }
  
  public modificarTareaAlumno(tarea:Tarea, id:number) {
   
    return this.http.put<Tarea[]>(`${this.url}/modificarTareaAlumno/${id}`,tarea, this.getHeaders());
  }

}
