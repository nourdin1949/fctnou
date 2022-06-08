import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/utils/interfaces/Interface';
import { environment } from 'src/environments/environment';
/**
 * The empresas component
 */
@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  /**
   * Url de la api
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
  public getHeaders(){
    const headers= {headers: {
      "Authorization": "Bearer " +localStorage.getItem("token")
    }}
    return headers
  }
  /**
   * El método recibe un parametro de tipo Empresa
   * @param empresa 
   * @returns 
   */
  public insertarEmpresas(empresa:Empresa): Observable<Empresa>{
    return this.http.post<Empresa>(`${this.url}/insertarEmpresa`, empresa, this.getHeaders())
  }
  /**
   * El método recibe un parametro de tipo Empresa
   * @param empresa 
   * @returns 
   */
  public insertarEmpresasCSV(empresa:Empresa): Observable<Empresa>{
    return this.http.post<Empresa>(`${this.url}/insertarEmpresaCSV`, empresa, this.getHeaders())
  }
  /**
   *  Método para listar todas las empresas
   * @returns 
   */
  public listarEmpresas(): Observable<Empresa[]>{

    return this.http.get<Empresa[]>(`${this.url}/listarEmpresas`, this.getHeaders())
  }
  /**
   * Método para eliminar empresa por id 
   * @param id 
   * @returns 
   */
  public eliminarEmpresa(id:number){

    return this.http.delete<Empresa[]>(`${this.url}/eliminarEmpresa/${id}`, this.getHeaders())
  }
  /**
   * Meoodo listar alumnos empresa by id
   * @param id 
   * @returns 
   */
  public listarAlumnosEmpresa(id){
    
    return this.http.get<any[]>(`${this.url}/listarAlumnosEmpresa/${id}`, this.getHeaders())
  }
  /**
   * Metodo buscar empresa by id
   * @param id 
   * @returns 
   */
  public findEmpresaByid(id:number){
  
    return this.http.get<Empresa[]>(`${this.url}/findEmpresaByid/${id}`, this.getHeaders())
  }
  /**
   * Metodo modificar empresa by id
   * @param id 
   * @param empresa 
   * @returns 
   */
  public updateEmpresaById(id:number,empresa:Empresa ){
    
    return this.http.put<Empresa[]>(`${this.url}/updateEmpresaById/${id}`,empresa, this.getHeaders())
  }
  /**
   * Metodo para comprobar que no existe el dni en esa empresa
   * @param dni 
   * @param id 
   * @returns 
   */
  public checkifEmpresaDNIBYID(dni:string, id:number){
  
    return this.http.get(`${this.url}/checkifEmpresaDNIBYID/${dni}/${id}`, this.getHeaders())
  }
  /**
   * Metodo comprobar empresa dni
   * @param dni 
   * @returns 
   */
  public checkifEmpresaDNI(dni:string){
  
    return this.http.get(`${this.url}/checkifEmpresaDNI/${dni}`, this.getHeaders())
  }
  /**
   * Metodo if emresa cif by id
   * @param cif 
   * @param id 
   * @returns 
   */
  public checkifEmpresaCIFBYID(cif:string, id:number){
  
    return this.http.get(`${this.url}/checkifEmpresaCIFBYID/${cif}/${id}`, this.getHeaders())
  }
  /**
   * Metodo compresa empresa cif
   * @param cif 
   * @returns 
   */
  public checkifEmpresaCIF(cif:string){
  
    return this.http.get(`${this.url}/checkifEmpresaCIF/${cif}`, this.getHeaders())
  }
}
