import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno, Curso } from 'src/app/utils/interfaces/Interface';
import { environment } from 'src/environments/environment';
/**
 * The cursos servicess
 */
@Injectable({
  providedIn: 'root'
})
export class CursosService {
  /**
   * La url de la api
   */
  private url=environment.url;
  /**
   * Constructor
   * @param http 
   */
  constructor(private http: HttpClient) { }
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
   * El método recibe un parametro de tipo Curso
   * @param Curso 
   * @returns 
   */
  insertarCurso(Curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.url}/insertarCurso`, Curso, this.getHeaders())
  }
  /**
   * Método para listar todas las Cursos 
   * @returns 
   */
  listarCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.url}/listarCursos`, this.getHeaders())
  }
  /**
   * Método para eliminar Curso por id
   * @param id 
   * @returns 
   */
  eliminarCurso(id: number) {
    return this.http.delete<Curso[]>(`${this.url}/eliminarCurso/${id}`, this.getHeaders())
  }
  /**
   * Método para buscar  Curso por id
   * @param id 
   * @returns 
   */
  findCursoById(id:number){
    return this.http.get<Curso[]>(`${this.url}/findCursoById/${id}`, this.getHeaders())
  }
  /**
   * Método para alumnos matriculados
   * @param id 
   * @returns 
   */
  alumnosMatriculados(id:number){
    return this.http.get<Alumno[]>(`${this.url}/alumnosMatriculados/${id}`, this.getHeaders())
  }
  /**
   * Método para modificar curso by id
   * @param id 
   * @param curso 
   * @returns 
   */
  updateCursoById(id: number, curso: Curso) {
    return this.http.put<Curso[]>(`${this.url}/updateCursoById/${id}`, curso, this.getHeaders())
  }
}
