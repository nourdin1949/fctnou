import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarea } from 'src/app/utils/interfaces/Interface';
import { environment } from 'src/environments/environment';
/**
 * The anexo v service
 */
@Injectable({
  providedIn: 'root'
})
export class AnexoVService {
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
   * Metodo insertar tareas
   * @param objeto 
   * @returns 
   */
  public insertarAnexoV(objeto:object) {
    return this.http.post(`${this.url}/insertarTareas`, objeto, this.getHeaders());
  }
  /**
   * Metodo listar tareas alumnos
   * @returns 
   */
  public listartareasAlumnos() {
    let idAlumno= sessionStorage.getItem('id');
    console.log("buscando tareas por id")
    return this.http.get<Tarea[]>(`${this.url}/listarTareasPorIDAlumno/${idAlumno}`, this.getHeaders());
  }
  /**
   * Metodo listar tareas por id 
   * @param id 
   * @returns 
   */
  public listarTareasPorID(id:number) {
    
    return this.http.get<Tarea[]>(`${this.url}/listarTareasPorID/${id}`, this.getHeaders());
  }
  /**
   *  metodo listar tareas entre dos fechas
   * @param objeto 
   * @param idAlumno 
   * @returns 
   */
  public listarTareasEntreFechasAlumno(objeto, idAlumno) {
    
    return this.http.post<Tarea[]>(`${this.url}/listarTareasEntreFechasAlumno/${idAlumno}`,objeto, this.getHeaders());
  }
  /**
   *  metodo listar tareas entre dos fechas
   * @param objeto 
   * @param idAlumno 
   * @returns 
   */
  public listarTareasEntreFechas(objeto, idAlumno) {
    
    return this.http.post<Tarea[]>(`${this.url}/listarTareasEntreFechas/${idAlumno}`,objeto, this.getHeaders());
  }
  /**
   * Metodo fichaSemanal
   * @returns 
   */
  public fichasemanal(){
    let idAlumno= sessionStorage.getItem('id');
    return this.http.get<Tarea[]>(`${this.url}/fichasemanal/${idAlumno}`, this.getHeaders());
  }
  /**
   * metodo para eliminar
   * @param id 
   * @returns 
   */
  public eliminarTarea(id:number){
    return this.http.delete<Tarea[]>(`${this.url}/eliminarTareaAlumno/${id}`, this.getHeaders());
    
  }
  /**
   * Metodo modifciar tareas
   * @param tarea 
   * @param id 
   * @returns 
   */
  public modificarTareaAlumno(tarea:Tarea, id:number) {
   
    return this.http.put<Tarea[]>(`${this.url}/modificarTareaAlumno/${id}`,tarea, this.getHeaders());
  }

}
