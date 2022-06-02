import {  Component ,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Curso, Profesor } from 'src/app/utils/interfaces/Interface';
import { ProfesorService } from '../../profesor/profesor.service';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-modificar-cursos',
  templateUrl: './modificar-cursos.component.html',
  styleUrls: ['./modificar-cursos.component.css']
})
export class ModificarCursosComponent implements OnInit{
  public idCurso:number=0;
  public curso:any={}
  public profesores:Profesor[]=[]
  public formModificarCurso:FormGroup

  public constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, 
    private cursoService: CursosService,
    private profesorService: ProfesorService) {
      this.activatedRoute.params.subscribe(m => {
        this.idCurso = m['id']
        console.log(this.idCurso)
        this.findCursoById()
      })
   

      this.formModificarCurso = this.fb.group({
        code:['', [Validators.required, Validators.pattern('[A-Z a-z]{2,}')]],
        familia:['', [Validators.required, Validators.pattern('[A-Z a-z]{3,}')]],
        ciclo:['', [Validators.required, Validators.pattern('[A-Z a-z]{3,}')]],
        curso:['',[ Validators.required, Validators.pattern('[0-9]{4}-[0-9]{4}')]],
        horas:['', [Validators.required,Validators.pattern('[0-9]{1,8}')]],
        tutor:['', Validators.required]
      })

  }
  public ngOnInit(): void {
    this.listarProfesores()
  }
 

  modificarCurso(form: FormGroup) {
    const curso: Curso = {
      "id":this.idCurso,
      "codigoCiclo":form.value.code, 
      "familiaProfesional":form.value.familia, 
      "cicloFormativo":form.value.ciclo, 
      "cursoAcademico":form.value.curso,
      "nHoras":form.value.horas,
      "tutor_id":form.value.tutor
    }
    if(this.formModificarCurso.valid ){
      this.cursoService.updateCursoById(this.idCurso,curso)
      .subscribe((response) => {
        (<HTMLButtonElement>document.getElementById("modificado")).click()
      })
    }
  }

  public findCursoById() {
    this.cursoService.findCursoById(this.idCurso)
      .subscribe((response) => {
        this.curso = response
        console.log(this.curso)
        let curso = {
          "code":this.curso.codigoCiclo,
          "familia":this.curso.familiaProfesional,
          "ciclo":this.curso.cicloFormativo,
          "curso":this.curso.cursoAcademico,
          "horas":this.curso.nHoras,
          "tutor":this.curso.tutor_id,
        }
        console.log(curso)
        this.formModificarCurso.setValue(curso)
      })
  }

  public listarProfesores(){
    this.profesorService.listarProfesor().subscribe((response)=>{
      this.profesores = response
    })
  }

}
