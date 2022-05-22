import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso, Profesor } from 'src/app/Shared/interfaces/Interface';
import { ProfesorService } from '../../profesor/profesor.service';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-insertar-curso',
  templateUrl: './insertar-curso.component.html',
  styleUrls: ['./insertar-curso.component.css']
})
export class InsertarCursoComponent implements OnInit {
  public profesores:Profesor[]=[]
  public forminsertarCurso: FormGroup;
  constructor(private fb: FormBuilder, private cursoService:CursosService, private profesorService:ProfesorService) {
    this.forminsertarCurso = this.fb.group({
      code:['', Validators.required],
      familia:['', Validators.required],
      ciclo:['', Validators.required],
      curso:['', Validators.required],
      horas:['', Validators.required],
      tutor:['0', Validators.required]
    })
  }

  ngOnInit(): void {
  this.listarProfesor()
  }
  insertarCurso(form:FormGroup){
 
      const curso: Curso = {
        "id":0,
        "codigoCiclo":form.value.code, 
        "familiaProfesional":form.value.familia, 
        "cicloFormativo":form.value.ciclo, 
        "cursoAcademico":form.value.curso,
        "nHoras":form.value.horas,
        "tutor_id":form.value.tutor
      }
      console.log(curso)
      if(this.forminsertarCurso.valid ){
          this.cursoService.insertarCurso(curso).subscribe((response)=>{
            this.cursoService.listarCursos().subscribe()
          })
      }
  }

  public listarProfesor(){
    this.profesorService.listarProfesor().subscribe((response)=>{
      this.profesores= response;
    })
  }
}
