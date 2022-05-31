import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from './interfaces/Interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public perfil = ""
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
  authAlumno() {
    if (localStorage.getItem("Perfil") == "alumno" && localStorage.getItem('token'))
      return true
    return false
  }
  authResponsable() {
    if (localStorage.getItem("Perfil") == "responsable" && localStorage.getItem('token'))
      return true
    return false
  }
  authAdmin() {
    if (localStorage.getItem("Perfil") == "admin" && localStorage.getItem('token'))
      return true
    return false
  }
  authProfesor() {
    if (localStorage.getItem("Perfil") == "profesor" && localStorage.getItem('token'))
      return true
    return false
  }
  islogged() {
    console.log(localStorage.getItem("Perfil"))
    if (localStorage.getItem("Perfil") && localStorage.getItem('token'))
      return true
    return false
  }
  signedIn(objeto: object) {
    return this.http.post<any>(`${this.url}/login`, objeto)
  }
  getUser() {
    return this.http.get<any>(`${this.url}/user`, {
      headers: {
        "Authorization": "Bearer " +localStorage.getItem("token")
      }
    })
  }

  forgotpassword(email:string){
    return this.http.post(`${this.url}/forgot-password`,{"email":email});
  }
  
  resetpassword(objeto:object){
    return this.http.post(`${this.url}/reset-password`,objeto);
  }
  logout(){
    return this.http.get(`${this.url}/logout`);
  }
  listarUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/users`);
  }
  
  getIdUserAlumno(username:string){
    return this.http.post<any>(`${this.url}/getIdByDniUser`,{'dni':username}, this.getHeaders());
  }
  getIdUserTutor(username:string){
    
    return this.http.post<any>(`${this.url}/getIdByDniUserTutor`,{'dni':username}, this.getHeaders());
  }
  getIdUserResposable(username:string){
    
    return this.http.post<any>(`${this.url}/getIdByDniUserResposable`,{'dni':username}, this.getHeaders());
  }
  
  sendEmailVerification(email){
    
    return this.http.post<any>(`${this.url}/email/verification-notification`,{'email':email, 'token':localStorage.getItem("token"), 'user':localStorage.getItem('user')}, this.getHeaders());
  }
  verificarEmail(objeto:object){
    
    return this.http.post<any>(`${this.url}/verificar`,objeto, this.getHeaders());
  }
  altaAdmin(){
    return this.http.get(`${this.url}`).subscribe();
  }
  getNombreResponsable(dni:string){
    return this.http.get<any>(`${this.url}/nombreResponsable/${dni}`, this.getHeaders());
  }
  getNombreProfesor(dni:string){
    return this.http.get<any>(`${this.url}/nombreTutor/${dni}`, this.getHeaders());
  }
  getNombreAlumno(dni:string){
    return this.http.get<any>(`${this.url}/nombreAlumno/${dni}`, this.getHeaders());
  }
  subirImagen(data){
    let username = sessionStorage.getItem("username")
    let user:any = sessionStorage.getItem("user")
    let id =JSON.parse(user).id
    return this.http.post<any>(`${this.url}/subirImg/${username}/${id}`, data, this.getHeaders());
  }
 
  validarEmail(email:string){
    return this.http.get<any>(`${this.url}/validarEmail/${email}`, this.getHeaders());
  }
  validarDNI(dni:string){
    return this.http.get<any>(`${this.url}/validarDNI/${dni}`, this.getHeaders());
  }
  validarEmailByID(email:string, id:number){
    return this.http.get<any>(`${this.url}/validarEmailByID/${email}/${id}`, this.getHeaders());
  }
  validarDNIByID(dni:string, id:number){
    return this.http.get<any>(`${this.url}/validarDNIByID/${dni}/${id}`, this.getHeaders());
  }

}
