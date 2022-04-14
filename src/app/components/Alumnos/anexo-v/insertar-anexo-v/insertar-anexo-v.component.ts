import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insertar-anexo-v',
  templateUrl: './insertar-anexo-v.component.html',
  styleUrls: ['./insertar-anexo-v.component.css']
})
export class InsertarAnexoVComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public contadorFilas=1;
  crearfila(){
    
    document.getElementById("tbody")!.insertAdjacentHTML('beforeend','<th>'+this.contadorFilas+'</th>'+
    '<th><textarea  class="form-control" name="descripcion"'+this.contadorFilas+'" id="descripcion"'+this.contadorFilas+'" cols="20" rows="2"></textarea></th>'+
    
    '<th><input type="text"  class="form-control" name="orientacion"'+this.contadorFilas+'" id="orientacion"'+this.contadorFilas+'"> </th>'+
    '<th><input type="time"  class="form-control" name="tiempo"'+this.contadorFilas+'" id="tiempo"'+this.contadorFilas+'"></th>'+
    '<th><input type="radio" name="dificultad'+this.contadorFilas+'[]" id=""><img src="../../../../../assets/img/easy.png" alt="">'+
     '   <input type="radio" name="dificultad'+this.contadorFilas+'[]" id=""><img src="../../../../../assets/img/medium.png" alt="">'+
      ' <input type="radio" name="dificultad'+this.contadorFilas+'[]" id=""> <img src="../../../../../assets/img/hard.png" alt="">   </th>'+
    '<th><input type="text"  class="form-control" name=""observaciones"'+this.contadorFilas+'"" id=""observaciones"'+this.contadorFilas+'""> </th>')
this.contadorFilas++
for(let i=0; i<document.getElementsByTagName("img").length;i++){
  document.getElementsByTagName("img")[i].style.width="40px"
}
   
  }
}
