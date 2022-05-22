import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/Shared/interfaces/Interface';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private url = "http://localhost:8000/api"

  constructor(private http: HttpClient) { }

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

  // Método para insertar Cursos
  /* El método recibe un parametro de tipo Curso */
  insertarCurso(Curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.url}/insertarCurso`, Curso, this.getHeaders())
  }
  /* Método para listar todas las Cursos */
  listarCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.url}/listarCursos`, this.getHeaders())
  }
  /* Método para eliminar Curso por id */
  eliminarCurso(id: number) {
    return this.http.delete<Curso[]>(`${this.url}/eliminarCurso/${id}`, this.getHeaders())
  }
  
  findCursoById(id:number){
    
    return this.http.get<Curso[]>(`${this.url}/findCursoById/${id}`, this.getHeaders())
  }

  updateCursoById(id: number, curso: Curso) {
    return this.http.put<Curso[]>(`${this.url}/updateCursoById/${id}`, curso, this.getHeaders())
  }
}
