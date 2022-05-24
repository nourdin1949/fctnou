import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alumno, Curso } from 'src/app/Shared/interfaces/Interface';
import { CursosService } from '../../cursos/cursos.service';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-modificar-alumnos',
  templateUrl: './modificar-alumnos.component.html',
  styleUrls: ['./modificar-alumnos.component.css']
})
export class ModificarAlumnosComponent implements OnInit {

  public alumno: any = {}
  public cursos: Curso[] = []
  public formModificarAlumno: FormGroup;
  public idAlumno: number;

  public constructor(
    private fb: FormBuilder,
    private cursoServoce: CursosService,
    private alumnosService: AlumnosService,
    private ActivatedRoute: ActivatedRoute) {

    this.ActivatedRoute.params.subscribe((params) => {
      this.idAlumno = params['id']
      this.findAlumnoById();
      this.listarCursos();
    })


    this.formModificarAlumno = this.fb.group({
      id: [0, Validators.required],
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      matriculado: [0, Validators.required],
      provincia: ['', Validators.required],
      localidad: ['', Validators.required],
      calle: ['', Validators.required],
      cp: [0, [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      curso: [0, Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],

    })
  }

  public ngOnInit(): void {

  }

  public modificarAlumno(form: FormGroup) {
    const alumno: Alumno = {
      "id": form.value.id,
      "nombreAlumno": form.value.nombre,
      "dniAlumno": form.value.dni,
      "curso_id": form.value.curso,
      "provincia": form.value.provincia,
      "localidad": form.value.localidad,
      "calle": form.value.calle,
      "cp": form.value.cp,
      "email": form.value.email,
      "matriculado": form.value.matriculado,
    }
    console.log(alumno)
    if (this.formModificarAlumno.valid) {
      this.alumnosService.updateAlumnoById(alumno)
        .subscribe(() => {
          (<HTMLButtonElement>document.getElementById("modificado")).click()
        })
    }
  }
  public listarCursos() {
    this.cursoServoce.listarCursos().subscribe((response) => this.cursos = response)
  }
  public findAlumnoById() {
    this.alumnosService.findAlumnoByid(this.idAlumno)
      .subscribe((response) => {
        this.alumno = response
        let alumno = {
          "id": this.idAlumno,
          "nombre": this.alumno.nombreAlumno,
          "dni": this.alumno.dniAlumno,
          "matriculado": this.alumno.matriculado,
          "provincia": this.alumno.provincia,
          "localidad": this.alumno.localidad,
          "calle": this.alumno.calle,
          "cp": this.alumno.cp,
          "curso": this.alumno.curso_id,
          "email": this.alumno.email,
        }

        this.formModificarAlumno.setValue(alumno)
      })
  }
}
