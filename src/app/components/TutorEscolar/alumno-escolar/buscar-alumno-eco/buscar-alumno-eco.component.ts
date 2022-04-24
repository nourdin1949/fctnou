import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-alumno-eco',
  templateUrl: './buscar-alumno-eco.component.html',
  styleUrls: ['./buscar-alumno-eco.component.css']
})
export class BuscarAlumnoEcoComponent implements OnInit {
  cadena:string =""
  constructor() { }

  ngOnInit(): void {
  }
  buscarAlumnos(){
    window.alert("Buscar Alumos que contiene"+this.cadena)
  }
}
