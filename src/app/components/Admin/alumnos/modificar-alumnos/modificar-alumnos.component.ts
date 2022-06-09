import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/Shared/shared.service';
import { Alumno, Curso } from 'src/app/utils/interfaces/Interface';
import { customValidatordDniBYID, customValidatorEmailBYID, customValidatorFormatDNI } from 'src/app/utils/Validators/otrasValidaciones';
import { CursosService } from '../../cursos/cursos.service';
import { AlumnosService } from '../alumnos.service';
/**
 * The modificar alumnos component
 */
@Component({
  selector: 'app-modificar-alumnos',
  templateUrl: './modificar-alumnos.component.html',
  styleUrls: ['./modificar-alumnos.component.css']
})
export class ModificarAlumnosComponent  {
  /**
   * Objeto Alumno
   */
  public alumno: any = {}
  /**
   * Matriz curso
   */
  public cursos: Curso[] = []
  /**
   * Formulario
   */
  public formModificarAlumno: FormGroup;
  /**
   * Id alumno
   */
  public idAlumno: number;
  /**
   * Constructor
   * @param fb 
   * @param cursoServoce 
   * @param alumnosService 
   * @param ActivatedRoute 
   * @param sharedService 
   */
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
  /**
   * Metodo modificar Alumno
   * @param form 
   */
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
    if (this.formModificarAlumno.valid) {
      this.alumnosService.updateAlumnoById(alumno)
        .subscribe((e) => {
                   (<HTMLButtonElement>document.getElementById("modificado")).click()
        })
    }
  }
  /**
   * Metodo listar cursos
   */
  private listarCursos() {
    this.cursoServoce.listarCursos().subscribe((response) => this.cursos = response)
  }
  /**
   * Metodo buscar alumno by id
   */
  private findAlumnoById() {
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
