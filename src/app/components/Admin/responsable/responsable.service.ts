import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Responsable } from 'src/app/utils/interfaces/Interface';
import { environment } from 'src/environments/environment';
/**
 * Responsable service
 */
@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  /**
   * la url de la api
   */
  private url=environment.url;
  /**
   * Contructor
   * @param http 
   */
  public constructor(private http: HttpClient) { }
  /**
   * Cabecera de las peticiones
   * @returns 
   */
  public getHeaders(){
    const headers= {headers: {
      "Authorization": "Bearer " +localStorage.getItem("token")
    }}
    return headers
  }
  /**
   * Método para insertar Responsables
   * @param Responsable 
   * @returns 
   */
  public insertarResponsables(Responsable:Responsable): Observable<Responsable>{
    return this.http.post<Responsable>(`${this.url}/insertarResponsable`, Responsable, this.getHeaders())
  }
  /**
   * Método para listar todas las Responsables 
   * @returns 
   */
  public listarResponsables(): Observable<Responsable[]>{
    return this.http.get<Responsable[]>(`${this.url}/listarResponsables`, this.getHeaders())
  }
  /**
   * Método para eliminar todas las Responsables 
   * @param id 
   * @returns 
   */
  public eliminarResponsable(id:number){
    return this.http.delete<Responsable[]>(`${this.url}/eliminarResponsable/${id}`, this.getHeaders())
  }
  /**
   * Método para LISTAR Responsable por empresa_id
   * @param id 
   * @returns 
   */
  public findResponsablesByEmpresaID(id:number){
    return this.http.get<Responsable[]>(`${this.url}/findResponsablesByEmpresaID/${id}`, this.getHeaders())
  }
  /**
   * Metodo find responseble by id
   * @param id 
   * @returns 
   */
  public findResponsableByid(id:number){
    
    return this.http.get<Responsable[]>(`${this.url}/findResponsableByid/${id}`, this.getHeaders())
  }
  /**
   * Metodo modificar responsable by id
   * @param id 
   * @param responsable 
   * @returns 
   */
  public updateResponsableById(id:number, responsable:Responsable){
    
    return this.http.put<Responsable[]>(`${this.url}/updateResponsableById/${id}`, responsable,this.getHeaders())
  }
  
}
