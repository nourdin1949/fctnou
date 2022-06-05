import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno, Curso } from 'src/app/utils/interfaces/Interface';
import { SharedService } from 'src/app/Shared/shared.service';
import { customValidatorCodigoPostal, customValidatordDni, customValidatordDniBYID, customValidatorEmail, customValidatorFormatDNI, customValidatorLocalidad, customValidatorProvincia } from 'src/app/utils/Validators/otrasValidaciones';
import { CursosService } from '../../cursos/cursos.service';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-insertar-alumnos',
  templateUrl: './insertar-alumnos.component.html',
  styleUrls: ['./insertar-alumnos.component.css']
})
export class InsertarAlumnosComponent implements OnInit {
  public alumnos: Alumno[] = []
  public cursos: Curso[] = []
  public forminsertarAlumno: FormGroup;
get formulario (){
  return this.forminsertarAlumno.controls;
}
  constructor(private fb: FormBuilder, 
    private cursoServoce: CursosService, 
    private alumnosService: AlumnosService,
    private sharedService:SharedService) {
      this.forminsertarAlumno = this.fb.group({
        nombre: ['', Validators.required],
        dni: ['', [Validators.required, Validators.pattern("[0-9]{8}[A-Z]{1}")],
        [customValidatordDni.customValidDni(sharedService),customValidatorFormatDNI.customValidDNILETRA], 'blur' ],
        provincia: ['', Validators.required,[], 'blur'],
        localidad: ['', Validators.required,,'blur'],
        calle: ['', Validators.required],
        cp: ['', [Validators.required,  Validators.pattern("[0-9]{5}")],,'blur'  ],
        curso: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
        [customValidatorEmail.customValidEmail(sharedService)], 'blur' ]
      })
  }

  ngOnInit(): void {
    this.listarCursos()
  }

  insertarAlumo(form: FormGroup) {
    const alumno: Alumno = {
      "id": 0,
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
    if (this.forminsertarAlumno.valid) {
      this.alumnosService.insertarAlumnos(alumno)
        .subscribe((res) => {
          (<HTMLButtonElement>document.getElementById("insertado")).click()
          setTimeout(() => {
            (<HTMLElement>document.getElementById('insertarAlumno')).classList.remove('modal-open');
            (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('modal-backdrop'))[0].classList.remove('modal-backdrop')
          }, 300);
        })
    }
  }
  listarCursos() {
    this.cursoServoce.listarCursos().subscribe((response) => this.cursos = response)
  }

}
