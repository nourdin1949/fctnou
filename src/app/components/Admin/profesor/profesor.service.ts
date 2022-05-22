import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesor } from 'src/app/Shared/interfaces/Interface';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
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
  /* El método recibe un parametro de tipo Profesor */
  insertarProfesor(Profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(`${this.url}/insertarTutor`, Profesor, this.getHeaders())
  }
  /* Método para listar todas las Profesores */
  listarProfesor(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.url}/listarTutores`, this.getHeaders())
  }
  /* Método para eliminar Profesor por id */
  eliminarProfesor(id: number) {
    return this.http.delete<Profesor[]>(`${this.url}/eliminarTutor/${id}`,this.getHeaders())
  }
  
  findTutorByid(id:number){
    return this.http.get<Profesor[]>(`${this.url}/findTutorByid/${id}`,this.getHeaders())
  }

  updateTutorById(id:number, profesor:Profesor){
    return this.http.put(`${this.url}/updateTutorById/${id}`, profesor, this.getHeaders())
    
  }
}
