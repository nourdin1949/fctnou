import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css']
})
export class ListarCursosComponent implements OnInit {
  public cursos: number[]=[1,2,3,4,5,6]
  public alumnosCurso:number[]=[1,2,3,4,5,6]
  constructor() { }

  ngOnInit(): void {
  }

}
