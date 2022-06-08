import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Tarea } from 'src/app/utils/interfaces/Interface';
import { AnexoVService } from '../anexo-v.service';
/**
 * The insetar anexo component
 */
@Component({
  selector: `app-insertar-anexo-v`,
  templateUrl: `./insertar-anexo-v.component.html`,
  styleUrls: [`./insertar-anexo-v.component.css`]
})
export class InsertarAnexoVComponent {
  /**
   * Contador de filas
   */
  public contadorFilas = 0;
  /**
   * Fecha 
   */
  public fecha: string = ""
  /**
   * Matriz de tareas
   */
  public tareas: Tarea[] = []
  /**
   * HTML innhtml
   */
  public html
  /**
   * Validar filas
   */
  public existevacio = false
  /**
   * Constructor
   * @param anecovService 
   * @param activatedRoute 
   * @param _snackBar 
   */
  constructor(
    private anecovService: AnexoVService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,) {
    this.activatedRoute.params.subscribe((param) => {
      this.fecha = param['fecha']
    })
  }
  /**
   * Metodo crear fila
   */
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
    console.log(this.contadorFilas, "crear fila")
    for (let i = 0; i < tbody.getElementsByTagName("img").length; i++) {
      tbody.getElementsByTagName("img")[i].style.width = "30px"
    }
  }
  /**
   * metodo insertar tareas
   */
  public insertarTareas() {
    
    this.validarfilas()
    if (this.existevacio) {
      this.openSnackBar()
    } else {
      console.log(this.contadorFilas,"al insertar ")
      let cont =this.contadorFilas
      for (let i = 0; i < cont; i++) {
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
        this.anecovService.insertarAnexoV(objeto)
          .subscribe(
            () => {
              console.log(i, this.contadorFilas, "METODO INSERTAR")
              
            },()=>{}, ()=>{
              
                this.eliminarFila()
                if (this.contadorFilas==0) {
                
                  
                  (<HTMLButtonElement>document.getElementById("insertado")).click()
                }
              
            })
      }
    }
  }
  /**
   * Validar Tareas
   */
  public validarfilas() {
    this.existevacio=false
    console.log( this.contadorFilas,"veanmos al validar contradorfils")
    for (let i = 0; i < this.contadorFilas; i++) {
      console.log(i, this.contadorFilas, "veanmos i and contradorfils")
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
      Object.values(objeto).forEach(element => {
        if (element == "") {
          console.log(objeto)
          window.alert(element)
          this.existevacio = true;
        };
      });

    }
  }
  /**
   * Metodo eliminar fila
   */
  public eliminarFila() {
    let tbody = <HTMLElement>document.getElementById("tbody");
    tbody.lastChild?.remove()
    if(this.contadorFilas>0){
     
    this.contadorFilas--
    console.log(this.contadorFilas,"eliminar fila")
    }
  }
  /**
   * metodo opensnackbar
   */
  public openSnackBar() {
    this._snackBar.open("Todos los campos son obligatorios", "Close",
      {
        duration: 3000
      });
  }
  /**
   * metodo snackbar
   */
  public openSnackBarFilaInsertada() {
    this._snackBar.open("Tarea Insertada correctamente", "Close",
      {
        duration: 3000,
      });
  }
}
