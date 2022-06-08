import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Centro } from 'src/app/utils/interfaces/Interface';
import { environment } from 'src/environments/environment';
/**
 * The centros service
 */
@Injectable({
  providedIn: 'root'
})
export class CentrosService {
  /**
   * url de la api
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
   * Metodo insetar centro
   * @param centro 
   * @returns 
   */
  insertarCentro(centro: Centro): Observable<Centro> {
    return this.http.post<Centro>(`${this.url}/insertarCentro`, centro, this.getHeaders())
  }
  /**
   * Método para listar todas los centros
   * @returns 
   */
  listarCentros(): Observable<Centro[]> {
    return this.http.get<Centro[]>(`${this.url}/listarCentros`,this.getHeaders())
  }
  /**
   * Método para eliminar todas los centros
   * @param codigo 
   * @returns 
   */
  eliminarCentro(codigo:number){
    return this.http.delete(`${this.url}/eliminarCentro/${codigo}`,this.getHeaders())
  }
  /**
   * Método para buscar todos los centros
   * @param id 
   * @returns 
   */
  findCentroByid(id:number):Observable<Centro>{
    return this.http.get<Centro>(`${this.url}/findCentroByid/${id}`,this.getHeaders()) 
  }
  /**
   * Metodo update centro by id
   * @param id 
   * @param centro 
   * @returns 
   */
  updateCentroById(id:number, centro:Centro){
    return this.http.put<Centro>(`${this.url}/updateCentroById/${id}`,centro,this.getHeaders()) 
  }
  /**
   * Metodo check cif centro by id
   * @param cif 
   * @param id 
   * @returns 
   */
  checkifexistcifCentroByID(cif:string, id:number){
    return this.http.get<any>(`${this.url}/checkifexistcifCentroByID/${cif}/${id}`, this.getHeaders());
  }
  /**
   * Metodo check cif centro
   * @param cif 
   * @returns 
   */
  checkifexistcifCentro(cif:string){
    return this.http.get<any>(`${this.url}/checkifexistcifCentro/${cif}`, this.getHeaders());
  }
  /**
   * Metodo find centro by code
   * @param code 
   * @returns 
   */
  findCentroBycode(code:number){
    return this.http.get<any>(`${this.url}/findCentroBycode/${code}`, this.getHeaders());
  }
}
