import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from 'src/app/utils/interfaces/Interface';
import { environment } from 'src/environments/environment';
/**
 * The tutor empresa service
 */
@Injectable({
  providedIn: 'root'
})
export class TutorEmpresaService {
  /**
   * La url de la api
   */
  private url=environment.url;
  /**
   * Constructor
   * @param http 
   */
  constructor(private http: HttpClient) {}
  /**
   * Cabecera de la peticiones
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
   * Metodo listar alumnos del responsable
   * @returns 
   */
  public listarAlumnosDelResponsable() {
    let idResponsable = sessionStorage.getItem('id');
    console.log("buscando tareas por id")
   return this.http.get<any[]>(`${this.url}/alumosResponsable/${idResponsable}`, this.getHeaders())
  }
  /**
   * Validar tarea del alumno
   * @param idTarea 
   * @returns 
   */
  public validarTareaResponsable(idTarea){
    return this.http.put<any[]>(`${this.url}/validaTareaResponsable/${idTarea}`,"", this.getHeaders())
  }
  /**
   * Metodo insetar mensaje de chat
   * @param chat 
   * @returns 
   */
  public insertarChat(chat){
    return this.http.post<any[]>(`${this.url}/insertarChat`,chat, this.getHeaders())
  }
  /**
   * Método listar mensaje de chat
   * @returns 
   */
  public listarChat(){
    return this.http.get<Chat[]>(`${this.url}/listarChat`,this.getHeaders())
  }
}