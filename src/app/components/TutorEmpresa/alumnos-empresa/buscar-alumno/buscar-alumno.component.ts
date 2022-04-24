import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-alumno',
  templateUrl: './buscar-alumno.component.html',
  styleUrls: ['./buscar-alumno.component.css']
})
export class BuscarAlumnoComponent implements OnInit {
  cadena:string =""
  constructor() { }

  ngOnInit(): void {
  }
  buscarAlumnos(){
    window.alert("Buscar Alumos que contiene"+this.cadena)
  }

}
