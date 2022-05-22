import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/Shared/interfaces/Interface';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private url = "http://localhost:8000/api"

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

  // Método para insertar empresas
  /* El método recibe un parametro de tipo Empresa */
  insertarEmpresas(empresa:Empresa): Observable<Empresa>{
    return this.http.post<Empresa>(`${this.url}/insertarEmpresa`, empresa, this.getHeaders())
  }

  /* Método para listar todas las empresas */
  public listarEmpresas(): Observable<Empresa[]>{

    return this.http.get<Empresa[]>(`${this.url}/listarEmpresas`, this.getHeaders())
  }

  /* Método para eliminar empresa por id */
  public eliminarEmpresa(id:number){

    return this.http.delete<Empresa[]>(`${this.url}/eliminarEmpresa/${id}`, this.getHeaders())
  }

  public listarAlumnosEmpresa(id){
    
    return this.http.get<any[]>(`${this.url}/listarAlumnosEmpresa/${id}`, this.getHeaders())
  }

  public findEmpresaByid(id:number){
  
    return this.http.get<Empresa[]>(`${this.url}/findEmpresaByid/${id}`, this.getHeaders())
  }
  public updateEmpresaById(id:number,empresa:Empresa ){
  
    return this.http.put<Empresa[]>(`${this.url}/updateEmpresaById/${id}`,empresa, this.getHeaders())
  }
}
