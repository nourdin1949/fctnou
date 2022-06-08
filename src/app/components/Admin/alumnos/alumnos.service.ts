import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno, FCTAlumno } from 'src/app/utils/interfaces/Interface';
import { environment } from 'src/environments/environment';
/**
 * The alumnos service
 */
@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  /**
   * Url de la api
   */
  private url = environment.url;
  /**
   * constructor
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
   * Método para insertar Alumnos
   * @param Alumno 
   * @returns 
   */
  public insertarAlumnos(Alumno: Alumno): Observable<Alumno> {

    return this.http.post<Alumno>(`${this.url}/insertarAlumno`, Alumno, this.getHeaders())
  }
  /**
   *  Método para listar todas las Alumnos 
   * @returns 
   */
  public listarAlumnos(): Observable<Alumno[]> {

    return this.http.get<Alumno[]>(`${this.url}/listarAlumnos`, this.getHeaders())
  }
  /**
   * Método para listar todas las Alumnos EN PRACTICA
   * @returns 
   */
  public listarAlumnosFCT(): Observable<FCTAlumno[]> {

    return this.http.get<FCTAlumno[]>(`${this.url}/listarAlumnosFCT`, this.getHeaders())
  }
  /**
   * Método para eliminar Alumno por id 
   * @param id 
   * @returns 
   */
  public eliminarAlumno(id: number) {

    return this.http.delete<Alumno[]>(`${this.url}/eliminarAlumno/${id}`, this.getHeaders())
  }
  /**
   * Método para eliminar Alumno por id 
   * @param id 
   * @returns 
   */
  public eliminarAlumnoFCT(id: number) {

    return this.http.delete<Alumno[]>(`${this.url}/eliminarAlumnoFCT/${id}`, this.getHeaders())
  }
  /**
   * Método para buscar Alumno por id 
   * @param id 
   * @returns 
   */
  public findAlumnoByid(id: number) {

    return this.http.get<Alumno>(`${this.url}/findAlumnoByid/${id}`, this.getHeaders())
  }
  /**
   * Método para modificar Alumno por id 
   * @param Alumno 
   * @returns 
   */
  public updateAlumnoById(Alumno: Alumno) {

    return this.http.put<Alumno[]>(`${this.url}/updateAlumnoByid/${Alumno.id}`, Alumno, this.getHeaders())
  }
  /**
   * Método para cambiar Alumno de empresa de practica 
   * @param datosACambiar 
   * @param idAlumnofct 
   * @returns 
   */
  public changeAlumnoDeEmpresa(datosACambiar: object, idAlumnofct: number) {

    return this.http.put<Alumno[]>(`${this.url}/modificarAlumnoFCT/${idAlumnofct}`, datosACambiar, this.getHeaders())
  }
  /**
   * metodo obtener nombre del curso
   * @param code 
   * @returns 
   */
  public nombreCurso(code: string) {
    return this.http.get<any>(`${this.url}/nombreCurso/${code}`, this.getHeaders())

  }
  /**
   * Metodo listar alumnos en practica en una empresa y de uun centro concreto
   * @param empresa 
   * @param tutor 
   * @returns 
   */
  public listarAlumnosFCTBYEmpresaANDCentro(empresa: number, tutor: number) {
    return this.http.get<any>(`${this.url}/listarAlumnosFCTBYEmpresaANDCentro/${empresa}/${tutor}`, this.getHeaders())

  }


}
