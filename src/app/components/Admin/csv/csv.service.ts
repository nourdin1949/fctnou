import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FCTAlumnoLista, RegisterUser, Responsable } from 'src/app/utils/interfaces/Interface';
import { environment } from 'src/environments/environment';
/**
 * The csv service
 */
@Injectable({
  providedIn: 'root'
})
export class CsvService {
  /**
   * la url de la api
   */
  private url = environment.url;
  /**
   * Constructor
   * @param http 
   */
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
  /**
   * Metodo para registrar usuario
   * @param user 
   * @returns 
   */
  public registerUser(user: RegisterUser) {
    return this.http.post(`${this.url}/register`, user, this.getHeaders())
  }
  /**
   * Metodo buscar responsable por empresa
   * @param idEmpresa 
   * @returns 
   */
  public findResponsablesByEmpresaID(idEmpresa: number): Observable<Responsable[]> {
    return this.http.get<Responsable[]>(`${this.url}/findResponsablesByEmpresaID/${idEmpresa}`, this.getHeaders())
  }
  /**
   * Metodo buscar si alumnos practica existe
   * @param idAlumno 
   * @returns 
   */
  public checkifAlumnoPractica(idAlumno: number) {
    return this.http.get(`${this.url}/checkifAlumnoPractica/${idAlumno}`, this.getHeaders())
  }
  /**
   * metodo comprobar que usuario existe
   * @param dni 
   * @returns 
   */
  public checkifUsersExist(dni: string) {
    return this.http.get(`${this.url}/checkifUsersExist/${dni}`, this.getHeaders())
  }
  /**
   * metodo insertar alumnos practica
   * @param fctalumno 
   * @returns 
   */
  public insetarfctalumno(fctalumno: FCTAlumnoLista) {
    return this.http.post(`${this.url}/insertarAlumnoFCT`, fctalumno, this.getHeaders())
  }
}
