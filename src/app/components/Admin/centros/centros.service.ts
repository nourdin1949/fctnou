import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Centro } from 'src/app/Shared/interfaces/Interface';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {
  private url = "http://localhost:8000/api"

  constructor(private http: HttpClient) { }
  
  /**
   * Cabecera 
   */
  public getHeaders() {
    const headers = {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }
    return headers
  }
  // Método para insertar centros
  /* El método recibe un parametro de tipo Centro */
  insertarCentro(centro: Centro): Observable<Centro> {
    return this.http.post<Centro>(`${this.url}/insertarCentro`, centro, this.getHeaders())
  }
  /* Método para listar todas los centros */
  listarCentros(): Observable<Centro[]> {
    return this.http.get<Centro[]>(`${this.url}/listarCentros`,this.getHeaders())
  }
  
  eliminarCentro(codigo:number){
    return this.http.delete(`${this.url}/eliminarCentro/${codigo}`,this.getHeaders())
  }

  findCentroByid(id:number):Observable<Centro>{
    return this.http.get<Centro>(`${this.url}/findCentroByid/${id}`,this.getHeaders()) 
  }
  
  updateCentroById(id:number, centro:Centro){
    return this.http.put<Centro>(`${this.url}/updateCentroById/${id}`,centro,this.getHeaders()) 

  }
}
