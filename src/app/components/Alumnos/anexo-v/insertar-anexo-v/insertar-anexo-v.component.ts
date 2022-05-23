import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tarea } from 'src/app/Shared/interfaces/Interface';
import { AnexoVService } from '../anexo-v.service';

@Component({
  selector: `app-insertar-anexo-v`,
  templateUrl: `./insertar-anexo-v.component.html`,
  styleUrls: [`./insertar-anexo-v.component.css`]
})
export class InsertarAnexoVComponent implements OnInit {
  public fecha: string=""
  public tareas:Tarea[]=[]
  constructor(
    private anecovService:AnexoVService, 
    private activatedRoute:ActivatedRoute) {
      this.activatedRoute.params.subscribe((param)=>{
        this.fecha = param['fecha']
      })
     }

  ngOnInit(): void {
  }
  public contadorFilas = 1;
  crearfila() {

    document.getElementById("tbody")?.insertAdjacentHTML(`beforeend`, 
      `<td><textarea  class="form-control" name="descripcion${this.contadorFilas}" id="descripcion${this.contadorFilas}" cols="20" rows="2"></textarea></td>` +

      `<td><input type="text"  class="form-control" name="orientacion${this.contadorFilas}" id="orientacion${this.contadorFilas}"> </td>` +
      `<td><input type="time"  class="form-control" name="tiempo${this.contadorFilas} " id="tiempo${this.contadorFilas}"></td>` +
      `<td><input type="radio"  value="facil" name="dificultad${this.contadorFilas}" id="dificultad${this.contadorFilas}"><img src="../../../../../assets/img/easy.png" alt="">` +
      `   <input type="radio"  value="medio" name="dificultad${this.contadorFilas}" id="dificultad${this.contadorFilas}"><img src="../../../../../assets/img/medium.png" alt="">` +
      ` <input type="radio"  value="dificil" name="dificultad${this.contadorFilas}" id="dificultad${this.contadorFilas}"> <img src="../../../../../assets/img/hard.png" alt="">   </td>` +
      `<td><input type="text"  class="form-control" name="observaciones${this.contadorFilas}" id="observaciones${this.contadorFilas}"> </td>`)
    this.contadorFilas++
    for (let i = 0; i < document.getElementsByTagName("img").length; i++) {
      document.getElementsByTagName("img")[i].style.width = "30px"
    }
  }
  insertarTareas() {
    
    for (let i = 0; i < this.contadorFilas; i++) {
      console.log(i, this.contadorFilas)
      const objeto={
        "alumno_id":sessionStorage.getItem('id'),
        "descripcion":(<HTMLInputElement>document.getElementById(`descripcion${i}`))?.value,
        "orientacion":(<HTMLInputElement>document.getElementById(`orientacion${i}`))?.value,
        "tiempo":(<HTMLInputElement>document.getElementById(`tiempo${i}`))?.value+":00",
        "fecha":this.fecha,
        "dificultad":(<HTMLInputElement>document.getElementById(`dificultad${i}`))?.value,
        "observaciones":(<HTMLInputElement>document.getElementById(`observaciones${i}`))?.value,
        "validadoResponsable":0,
        "validadoTutor":0
      };
      this.anecovService.insertarAnexoV(objeto).subscribe((res)=>{
        if(i==this.contadorFilas-1){
          (<HTMLButtonElement>document.getElementById("insertado")).click()
        }
        
      })
    }
  }


}
