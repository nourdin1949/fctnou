import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Tarea } from 'src/app/utils/interfaces/Interface';
import { AnexoVService } from '../anexo-v.service';

@Component({
  selector: `app-insertar-anexo-v`,
  templateUrl: `./insertar-anexo-v.component.html`,
  styleUrls: [`./insertar-anexo-v.component.css`]
})
export class InsertarAnexoVComponent implements OnInit {
  public contadorFilas = 0;
  public fecha: string = ""
  public tareas: Tarea[] = []
  public html
  constructor(
    private anecovService: AnexoVService,
    private activatedRoute: ActivatedRoute, 
    private _snackBar:MatSnackBar,) {
    this.activatedRoute.params.subscribe((param) => {
      this.fecha = param['fecha']
    })
  }

  ngOnInit(): void {
  }
  public crearfila() {
    let tbody = <HTMLElement>document.getElementById("tbody");
    tbody?.insertAdjacentHTML(`beforeend`,
      `<td><textarea  class="form-control" required name="descripcion${this.contadorFilas}" id="descripcion${this.contadorFilas}" cols="20" rows="2"></textarea></td>` +

      `<td><input type="text" required="true" class="form-control" name="orientacion${this.contadorFilas}" id="orientacion${this.contadorFilas}"> </td>` +
      `<td><input type="time" required="true"  class="form-control" name="tiempo${this.contadorFilas} " id="tiempo${this.contadorFilas}"></td>` +
      `<td><input type="radio" required="true"  value="facil" name="dificultad${this.contadorFilas}" id="dificultad${this.contadorFilas}"><img src="../../../../../assets/img/easy.png" alt="">` +
      `   <input type="radio" required="true"  value="medio" name="dificultad${this.contadorFilas}" id="dificultad${this.contadorFilas}"><img src="../../../../../assets/img/medium.png" alt="">` +
      ` <input type="radio"  required="true" value="dificil" name="dificultad${this.contadorFilas}" id="dificultad${this.contadorFilas}"> <img src="../../../../../assets/img/hard.png" alt="">   </td>` +
      `<td><input type="text"  required="true"   class="form-control" name="observaciones${this.contadorFilas}" id="observaciones${this.contadorFilas}"> </td>`)
    this.contadorFilas++
    for (let i = 0; i < tbody.getElementsByTagName("img").length; i++) {
      tbody.getElementsByTagName("img")[i].style.width = "30px"
    }
  }
  public insertarTareas() {
    for (let i = 0; i < this.contadorFilas; i++) {
      console.log(i, this.contadorFilas)
      let dificultad = ""
      let radioDificultades = (<NodeListOf<HTMLInputElement>>document.getElementsByName(`dificultad${i}`))
      radioDificultades.forEach(element => {
        if (element.checked) {
          console.log(element)
          dificultad = element.value
        }
      });
      const objeto = {
        "alumno_id": sessionStorage.getItem('id'),
        "descripcion": (<HTMLInputElement>document.getElementById(`descripcion${i}`))?.value,
        "orientacion": (<HTMLInputElement>document.getElementById(`orientacion${i}`))?.value,
        "tiempo": (<HTMLInputElement>document.getElementById(`tiempo${i}`))?.value,
        "fecha": this.fecha,
        "dificultad": dificultad,
        "observaciones": (<HTMLInputElement>document.getElementById(`observaciones${i}`))?.value,
        "validadoResponsable": "0",
        "validadoTutor": "0"
      };
      window.alert(objeto.dificultad)
      let existevacio = false
      Object.values(objeto).forEach(element => {
        if (element == "") {
          existevacio = true;
        };
      });
      if (existevacio) {
        this.openSnackBar()
      } else {
        this.anecovService.insertarAnexoV(objeto).subscribe((res) => {
          this.openSnackBarFilaInsertada()
          if (i == this.contadorFilas - 1) {
            this.html = "";

            (<HTMLButtonElement>document.getElementById("insertado")).click()
            this.contadorFilas = 0;
            this.crearfila()
          }
        })
      }
    }
  }
  public eliminarFila(){
    let tbody = <HTMLElement>document.getElementById("tbody");
    tbody.lastChild?.remove()
    this.contadorFilas--
  }
  public openSnackBar() {
    this._snackBar.open("Todos los campos son obligatorios", "Close",
      {
        duration: 3000
      });
  }

  public openSnackBarFilaInsertada() {
    this._snackBar.open("Tarea Insertada correctamente", "Close",
      {
        duration: 3000,
      });
  }
}
