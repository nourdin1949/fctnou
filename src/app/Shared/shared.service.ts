import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../utils/interfaces/Interface';
/**
 * Se trata de un servicio compartido
 */
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  /**
   * URL de la api
   */
  private url = environment.url;
  /**
   * Constructor
   * @param http 
   * @param router 
   */
  constructor(
    private http: HttpClient,
    private router: Router) { }

  /**
   * La cabecera de las peticiones
   * @returns cabecera httprequest
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
   * Metodo Comprobar Alumno
   * @returns 
   */
  public authAlumno() {
    if (localStorage.getItem("Perfil") == "alumno" && localStorage.getItem('token'))
      return true
    this.router.navigateByUrl("")
    return false
  }
  /**
   * Metodo comprobar perfil responsable
   * @returns 
   */
  public authResponsable() {
    if (localStorage.getItem("Perfil") == "responsable" && localStorage.getItem('token'))
      return true
    this.router.navigateByUrl("")
    return false
  }
  /**
   * Metodo comprobar perfil admin
   * @returns 
   */
  public authAdmin() {
    if (localStorage.getItem("Perfil") == "admin" && localStorage.getItem('token'))
      return true
    this.router.navigateByUrl("")
    return false
  }
  /**
   * Metodo comprobar perfil profesor
   * @returns 
   */
  public authProfesor() {
    if (localStorage.getItem("Perfil") == "profesor" && localStorage.getItem('token'))
      return true
    this.router.navigateByUrl("")
    return false
  }
  /**
   * Comprobar si usuario está logeado
   * @returns 
   */
  public islogged() {
    console.log(localStorage.getItem("Perfil"))
    if (localStorage.getItem("Perfil") && localStorage.getItem('token'))
      return true
    this.router.navigateByUrl("")
    return false
  }
  /**
   * Metodo de inicio de sesion
   * @param objeto Datos de inicio de sesion
   * @returns 
   */
  public signedIn(objeto: object) {
    return this.http.post<any>(`${this.url}/login`, objeto)
  }
  /**
   *  Obtener usuario registrado
   * @returns  devuelve datos de usuario conectado
   */
  public getUser() {
    return this.http.get<any>(`${this.url}/user`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
  }
  /**
   * Recuperar contraseña por email
   * @param email para recuperar contraseña
   * @returns 
   */
  public forgotpassword(email: string) {
    return this.http.post(`${this.url}/forgot-password`, { "email": email });
  }
  /**
   * La nueva contraseña
   * @param objeto json con datos de recuperacion de contraseña
   * @returns 
   */
  public resetpassword(objeto: object) {
    return this.http.post(`${this.url}/reset-password`, objeto);
  }
  /**
   * Metodo de cerrar sesión
   * @returns observable
   */
  public logout() {
    return this.http.get(`${this.url}/logout`);
  }
  /**
   * Listar usuarios 
   * @returns observable
   */
  public listarUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }
  /**
   * ID del usuario alumno
   * @param username del usuario alumno
   * @returns id del alumno
   */
  public getIdUserAlumno(username: string) {

    return this.http.post<any>(`${this.url}/getIdByDniUser`, { 'dni': username }, this.getHeaders());
  }
  /**
   * Id del usurio tutor
   * @param username del usuario tutor
   * @returns observable
   */
  public getIdUserTutor(username: string) {

    return this.http.post<any>(`${this.url}/getIdByDniUserTutor`, { 'dni': username }, this.getHeaders());
  }
  /**
   * Id del usuario responsable
   * @param username del usuario responsable
   * @returns observable
   */
  getIdUserResposable(username: string) {

    return this.http.post<any>(`${this.url}/getIdByDniUserResposable`, { 'dni': username }, this.getHeaders());
  }
  /**
   * Enviar correo de verificacion
   * @param email que deseamos verificar
   * @returns observable
   */
  sendEmailVerification(email) {

    return this.http.post<any>(`${this.url}/email/verification-notification`, { 'email': email, 'token': localStorage.getItem("token"), 'user': localStorage.getItem('user') }, this.getHeaders());
  }
  /**
   * Verificar correo
   * @param objeto json con los cmapos password, username y  email
   * @returns observable
   */
  public verificarEmail(objeto: object) {

    return this.http.post<any>(`${this.url}/verificar`, objeto, this.getHeaders());
  }
  /**
   * Metodo que da de alta al usuario admin
   * @returns null o true
   */
  public altaAdmin() {
    return this.http.get(`${this.url}`).subscribe();
  }
  /**
   * Obtener nombre responsable
   * @param dni usuario registrado
   * @returns observable
   */
  public getNombreResponsable(dni: string) {
    return this.http.get<any>(`${this.url}/nombreResponsable/${dni}`, this.getHeaders());
  }
  /**
   * Obtener nombre responsable
   * @param dni usuario registrado
   * @returns observable
   */
  public getNombreProfesor(dni: string) {
    return this.http.get<any>(`${this.url}/nombreTutor/${dni}`, this.getHeaders());
  }
  /**
  * Obtener nombre Alumno registrado
  * @param dni usuario registrado
  * @returns observable
  */
  public getNombreAlumno(dni: string) {
    return this.http.get<any>(`${this.url}/nombreAlumno/${dni}`, this.getHeaders());
  }
  /**
   * La nueva foto de perfil
   * @param data la imagen a subir
   * @returns observable
   */
  public subirImagen(data) {
    let username = sessionStorage.getItem("username")
    let user: any = sessionStorage.getItem("user")
    let id = JSON.parse(user).id
    return this.http.post<any>(`${this.url}/subirImg/${username}/${id}`, data, this.getHeaders());
  }
  /**
   * Eliminar foto de perfil
   * @returns 
   */
  public eliminarFoto(){
    let user: any = sessionStorage.getItem("user")
    let id = JSON.parse(user).id
    return this.http.put<any>(`${this.url}/eliminarFoto/${id}`, this.getHeaders());
  }
  /**
   * Comprobar no que existe el email
   * @param email a validar
   * @returns observable
   */
  public validarEmail(email: string) {
    return this.http.get<any>(`${this.url}/validarEmail/${email}`, this.getHeaders());
  }
  /**
   * Comprobar no que existe el dni
   * @param dni a validar
   * @returns observable
   */
  public validarDNI(dni: string) {
    return this.http.get<any>(`${this.url}/validarDNI/${dni}`, this.getHeaders());
  }
  /**
   * Comprobar que existe el email con ese id
   * @param email a validar
   * @param id del usuario
   * @returns observable
   */
  public validarEmailByID(email: string, id: number) {
    return this.http.get<any>(`${this.url}/validarEmailByID/${email}/${id}`, this.getHeaders());
  }
  /**
   *  Comprobar que existe el dni con ese id
   * @param dni a validar
   * @param id del usuario
   * @returns  observable
   */
  public validarDNIByID(dni: string, id: number) {
    return this.http.get<any>(`${this.url}/validarDNIByID/${dni}/${id}`, this.getHeaders());
  }
}
