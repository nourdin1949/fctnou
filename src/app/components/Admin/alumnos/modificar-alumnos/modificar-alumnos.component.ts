import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alumno, Curso } from 'src/app/Shared/interfaces/Interface';
import { SharedService } from 'src/app/Shared/shared.service';
import { customValidatorEmailBYID, customValidatordDniBYID, customValidatorFormatDNI } from 'src/app/utils/otrasValidaciones';
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
    private ActivatedRoute: ActivatedRoute,
    private sharedService: SharedService) {

    this.ActivatedRoute.params.subscribe((params) => {
      this.idAlumno = params['id']
      this.findAlumnoById();
      this.listarCursos();
    })

    this.formModificarAlumno = this.fb.group({
      id:[this.idAlumno],
      nombre: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern("[0-9]{8}[A-Z]{1}")],
      [customValidatordDniBYID.customValidDni(sharedService, this.idAlumno),
         customValidatorFormatDNI.customValidDNILETRA], 'blur' ],
      provincia: ['', Validators.required],
      localidad: ['', Validators.required],
      calle: ['', Validators.required],
      cp: ['', [Validators.required,  Validators.pattern("[0-9]{5}")]],
      curso: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      [customValidatorEmailBYID.customValidEmail(sharedService, this.idAlumno)], 'blur' ]

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
      "matriculado": 1,
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
