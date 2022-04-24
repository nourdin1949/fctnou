import { Component, OnInit } from '@angular/core';

@Component({
  selector: `app-insertar-anexo-v`,
  templateUrl: `./insertar-anexo-v.component.html`,
  styleUrls: [`./insertar-anexo-v.component.css`]
})
export class InsertarAnexoVComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public contadorFilas = 1;
  crearfila() {

    document.getElementById("tbody")?.insertAdjacentHTML(`beforeend`, `<td>${this.contadorFilas}</td>` +
      `<td><textarea  class="form-control" name="descripcion${this.contadorFilas}" id="descripcion${this.contadorFilas}" cols="20" rows="2"></textarea></td>` +

      `<td><input type="text"  class="form-control" name="orientacion${this.contadorFilas}" id="orientacion${this.contadorFilas}"> </td>` +
      `<td><input type="time"  class="form-control" name="tiempo${this.contadorFilas} " id="tiempo${this.contadorFilas}"></td>` +
      `<td><input type="radio" name="dificultad${this.contadorFilas}" id="dificultad${this.contadorFilas}"><img src="../../../../../assets/img/easy.png" alt="">` +
      `   <input type="radio" name="dificultad${this.contadorFilas}" id="dificultad${this.contadorFilas}"><img src="../../../../../assets/img/medium.png" alt="">` +
      ` <input type="radio" name="dificultad${this.contadorFilas}" id="dificultad${this.contadorFilas}"> <img src="../../../../../assets/img/hard.png" alt="">   </td>` +
      `<td><input type="text"  class="form-control" name="observaciones${this.contadorFilas}" id="observaciones${this.contadorFilas}"> </td>`)
    this.contadorFilas++
    for (let i = 0; i < document.getElementsByTagName("img").length; i++) {
      document.getElementsByTagName("img")[i].style.width = "40px"
    }
  }
  guardarTareas() {
    window.alert("Tarea Guarda")
    // console.log(document.getElementById("tbody")?.getElementsByTagName("td")[1], "nmada")
    // for (let i = 0; i < this.contadorFilas; i++) {
    //   console.log((<HTMLInputElement>document.getElementById(`descripcion${i}`))?.value)
    // }
  }
}
