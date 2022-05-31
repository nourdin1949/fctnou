import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TutorEscolarService {
  
  private url=environment.url;

  constructor(private http: HttpClient) {
    
  }
  /**
     * name
     */
  public getHeaders() {
    const headers = {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }
    return headers
  }

  public listarAlumnosDelTutor():Observable<any[]> {
    let idTutor = sessionStorage.getItem('id');
    
   return this.http.get<any[]>(`${this.url}/alumosTutor/${idTutor}`, this.getHeaders())
    
  }
  public validarTareaTutor(idTarea:number){
    return this.http.put<any[]>(`${this.url}/validaTareaTutor/${idTarea}`,"", this.getHeaders())
  }
}
