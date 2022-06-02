import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso, Profesor } from 'src/app/utils/interfaces/Interface';
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
      code:['', [Validators.required, Validators.pattern('[A-Z a-z]{2,}')]],
      familia:['', [Validators.required, Validators.pattern('[A-Z a-z]{3,}')]],
      ciclo:['', [Validators.required, Validators.pattern('[A-Z a-z]{3,}')]],
      curso:['',[ Validators.required, Validators.pattern('[0-9]{4}-[0-9]{4}')]],
      horas:['', [Validators.required,Validators.pattern('[0-9]{1,8}')]],
      tutor:['', Validators.required]
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
      console.log(this.forminsertarCurso.hasError, "errors")
      console.log(this.forminsertarCurso.valid,"valid")
      console.log(this.forminsertarCurso.invalid,"invalid")
      if(this.forminsertarCurso.valid){
          this.cursoService.insertarCurso(curso).subscribe(()=>{
            (<HTMLButtonElement>document.getElementById("insertado")).click()
            setTimeout(() => {
              (<HTMLElement>document.getElementById('insertarCurso')).classList.remove('modal-open');
              (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('modal-backdrop'))[0].classList.remove('modal-backdrop')
            }, 300);
          })
      }
  }

  public listarProfesor(){
    this.profesorService.listarProfesor().subscribe((response)=>{
      this.profesores= response;
    })
  }
}
