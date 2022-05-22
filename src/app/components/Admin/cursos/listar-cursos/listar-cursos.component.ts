import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/Shared/interfaces/Interface';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css']
})
export class ListarCursosComponent implements OnInit {
  public cursos:Curso[]=[]
  public idCurso:number=0
  public constructor(private cursoServie:CursosService) { 
    this.listarCursos()
  }

  public ngOnInit(): void {
   
  }
  public listarCursos(){
    this.cursoServie.listarCursos().subscribe((response)=>{
      this.cursos= response;
    })
  }
  public guardarid(idCurso:number){
    this.idCurso = idCurso
  }
  public eliminarCurso(){
    this.cursoServie.eliminarCurso(this.idCurso).subscribe((response)=>{
      this.listarCursos()
    })
  }
}
