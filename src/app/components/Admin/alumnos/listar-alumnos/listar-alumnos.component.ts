import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.component.html',
  styleUrls: ['./listar-alumnos.component.css']
})
export class ListarAlumnosComponent implements OnInit {
  public cursos: number[]=[1,2,3,4,5,6,7,8,9,10,11,12]
  public alumnosCurso:number[]=[1,2,3,4,5,6,7,8,9,10,11,12]
  public empresas: string []=["NTTDATA","EVERIS","VIEWNEXT","FCTR"]
  constructor() { }

  ngOnInit(): void {
  }

}
