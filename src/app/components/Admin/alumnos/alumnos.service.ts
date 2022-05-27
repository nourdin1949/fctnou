import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno, FCTAlumno } from 'src/app/Shared/interfaces/Interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private url=environment.url;
  
  constructor(private http: HttpClient) { }

  /**
   * name
   */
  public getHeaders(){
    const headers= {headers: {
      "Authorization": "Bearer " +localStorage.getItem("token")
    }}
    return headers
  }

  // Método para insertar Alumnos
  public insertarAlumnos(Alumno:Alumno): Observable<Alumno>{
    
    return this.http.post<Alumno>(`${this.url}/insertarAlumno`, Alumno, this.getHeaders())
  }

  // Método para listar todas las Alumnos 
  public listarAlumnos(): Observable<Alumno[]>{
    
    return this.http.get<Alumno[]>(`${this.url}/listarAlumnos`, this.getHeaders())
  }
  
  // Método para listar todas las Alumnos EN PRACTICA 
  public listarAlumnosFCT(): Observable<FCTAlumno[]>{
    
    return this.http.get<FCTAlumno[]>(`${this.url}/listarAlumnosFCT`, this.getHeaders())
  }

  // Método para eliminar Alumno por id 
  public eliminarAlumno(id:number){
    
    return this.http.delete<Alumno[]>(`${this.url}/eliminarAlumno/${id}` ,this.getHeaders())
  }
  
  // Método para eliminar Alumno por id 
  public eliminarAlumnoFCT(id:number){
    
    return this.http.delete<Alumno[]>(`${this.url}/eliminarAlumnoFCT/${id}` ,this.getHeaders())
  }
  
  public findAlumnoByid(id:number){
    
  return this.http.get<Alumno>(`${this.url}/findAlumnoByid/${id}`,this.getHeaders())
  }

  public updateAlumnoById(Alumno:Alumno){
  
    return this.http.put<Alumno[]>(`${this.url}/updateAlumnoByid/${Alumno.id}`,Alumno,this.getHeaders())
  }

  public changeAlumnoDeEmpresa(datosACambiar:object,idAlumnofct:number){
  
    return this.http.put<Alumno[]>(`${this.url}/modificarAlumnoFCT/${idAlumnofct}`,datosACambiar,this.getHeaders())
  }
}
