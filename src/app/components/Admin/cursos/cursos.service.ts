import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno, Curso } from 'src/app/utils/interfaces/Interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private url=environment.url;
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
  alumnosMatriculados(id:number){
    return this.http.get<Alumno[]>(`${this.url}/alumnosMatriculados/${id}`, this.getHeaders())
  }

  updateCursoById(id: number, curso: Curso) {
    return this.http.put<Curso[]>(`${this.url}/updateCursoById/${id}`, curso, this.getHeaders())
  }
}
