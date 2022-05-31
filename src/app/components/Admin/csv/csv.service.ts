import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  FCTAlumnoLista, RegisterUser, Responsable } from 'src/app/Shared/interfaces/Interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  private url=environment.url;  
  
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
  public registerUser(user:RegisterUser){
    return this.http.post(`${this.url}/register`, user,this.getHeaders())
  }

  public findResponsablesByEmpresaID(idEmpresa:number): Observable<Responsable[]>{
    return this.http.get<Responsable[]>(`${this.url}/findResponsablesByEmpresaID/${idEmpresa}`,this.getHeaders())
  }
  public checkifAlumnoPractica(idAlumno:number){
    return this.http.get(`${this.url}/checkifAlumnoPractica/${idAlumno}`,this.getHeaders())
  }

  public insetarfctalumno(fctalumno:FCTAlumnoLista){
    return  this.http.post(`${this.url}/insertarAlumnoFCT`, fctalumno,this.getHeaders())
  }
}
