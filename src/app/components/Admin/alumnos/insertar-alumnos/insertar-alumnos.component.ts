import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno, Curso } from 'src/app/Shared/interfaces/Interface';
import { CursosService } from '../../cursos/cursos.service';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-insertar-alumnos',
  templateUrl: './insertar-alumnos.component.html',
  styleUrls: ['./insertar-alumnos.component.css']
})
export class InsertarAlumnosComponent implements OnInit {
  public alumnos:Alumno[]=[]
  public cursos:Curso[] =[]
  public forminsertarAlumno: FormGroup;

  constructor(private fb: FormBuilder, private cursoServoce:CursosService, private alumnosService:AlumnosService) {
    this.forminsertarAlumno = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      provincia: ['', Validators.required],
      localidad: ['', Validators.required],
      calle: ['', Validators.required],
      cp: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      curso: ['0', Validators.required],
      email: ['', Validators.compose([Validators.required,Validators.email])],

    })
  }

  ngOnInit(): void {
    this.listarCursos()
  }

  insertarAlumo(form: FormGroup) {
    const alumno: Alumno = {
      "id":0,
      "nombreAlumno":form.value.nombre,
      "dniAlumno": form.value.dni,
      "curso_id": form.value.curso,
      "provincia": form.value.provincia,
      "localidad": form.value.localidad,
      "calle": form.value.calle,
      "cp": form.value.cp,
      "email": form.value.email,
      "matriculado":1,
    }
    console.log(alumno)
    if(this.forminsertarAlumno.valid){
      this.alumnosService.insertarAlumnos(alumno).subscribe((res)=>console.log(res))
    }
  }
  listarCursos(){
    this.cursoServoce.listarCursos().subscribe((response)=>this.cursos=response)
  }

}
