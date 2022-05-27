import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat, Profesor } from 'src/app/Shared/interfaces/Interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TutorEmpresaService {

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
  public listarAlumnosDelResponsable() {
    let idResponsable = sessionStorage.getItem('id');
    console.log("buscando tareas por id")
   return this.http.get<any[]>(`${this.url}/alumosResponsable/${8}`, this.getHeaders())
  }
  
  public validarTareaResponsable(idTarea){
    return this.http.put<any[]>(`${this.url}/validaTareaResponsable/${idTarea}`,"", this.getHeaders())
  }
  public insertarChat(chat:Chat){
    return this.http.post<Chat[]>(`${this.url}/insertarChat`,chat, this.getHeaders())
  }
  public listarChat(){
    return this.http.get<Chat[]>(`${this.url}/listarChat`,this.getHeaders())
  }


  
}
