import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Responsable } from 'src/app/Shared/interfaces/Interface';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  private url = "http://localhost:8000/api"

  public constructor(private http: HttpClient) { }

  /**
   * name
   */
  public getHeaders(){
    const headers= {headers: {
      "Authorization": "Bearer " +localStorage.getItem("token")
    }}
    return headers
  }

  // Método para insertar Responsables
  /* El método recibe un parametro de tipo Responsable */
  public insertarResponsables(Responsable:Responsable): Observable<Responsable>{
    return this.http.post<Responsable>(`${this.url}/insertarResponsable`, Responsable, this.getHeaders())
  }

  /* Método para listar todas las Responsables */
  public listarResponsables(): Observable<Responsable[]>{
    return this.http.get<Responsable[]>(`${this.url}/listarResponsables`, this.getHeaders())
  }

  /* Método para eliminar Responsable por id */
  public eliminarResponsable(id:number){
    return this.http.delete<Responsable[]>(`${this.url}/eliminarResponsable/${id}`, this.getHeaders())
  }

  /* Método para LISTAR Responsable por empresa_id*/
  public findResponsablesByEmpresaID(id:number){
    return this.http.get<Responsable[]>(`${this.url}/findResponsablesByEmpresaID/${id}`, this.getHeaders())
  }
  
  public findResponsableByid(id:number){
    
    return this.http.get<Responsable[]>(`${this.url}/findResponsableByid/${id}`, this.getHeaders())
  }
  
  public updateResponsableById(id:number, responsable:Responsable){
    
    return this.http.put<Responsable[]>(`${this.url}/updateResponsableById/${id}`, responsable,this.getHeaders())
  }
  
}
