import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { customValidatorDNIRegistroAlta } from 'src/app/utils/Validators/otrasValidaciones';
import { AlumnosService } from '../../alumnos/alumnos.service';
import { ProfesorService } from '../../profesor/profesor.service';
import { ResponsableService } from '../../responsable/responsable.service';
import { CsvService } from '../csv.service';
/**
 * The asignar roles
 */
@Component({
  selector: 'app-asignar-roles',
  templateUrl: './asignar-roles.component.html',
  styleUrls: ['./asignar-roles.component.css']
})
export class AsignarRolesComponent implements OnInit {
  /**
   * Formulario
   */
  public formRoles: FormGroup
  /**
   * Array datos
   */
  public todosDatos: any = []
  /**
   * Matriz datos temporal
   */
  public auxTodosDatos: any = []
  /**
   * perfil
   */
  public perfil: string = ""
  /**
   * Email
   */
  public email: string = ""
  /**
   * constructor
   */
  constructor(
    private fb: FormBuilder,
    private csvServ: CsvService,
    private profesorService: ProfesorService,
    private responsableService: ResponsableService,
    private alumnoservice: AlumnosService,
    private _snackBar: MatSnackBar) {
    this.formRoles = this.fb.group({
      dni: ['', Validators.required, customValidatorDNIRegistroAlta.customValidDNIRegistroAlta(csvServ), 'blur'],
      rol: ['', Validators.required],
      pwd: ['', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$")]],

    })
  }
  /**
   * NgOnInit
   */
  public ngOnInit(): void {
    this.listarAlumnos()
    this.listarProfesores()
    this.listarResponsables()
    this.auxTodosDatos = this.todosDatos
  }
  /**
   * Método registrar un usuario y darle un rol
   */
  public registerUser() {
    if (this.formRoles.valid) {

      const user = {
        "username": this.formRoles.value.dni, "password": this.formRoles.value.pwd, "email": this.email,
        "confirm_password": this.formRoles.value.pwd, "activo": "1", "perfil": this.formRoles.value.rol
      }
      console.log(user)
      this.openSnackBar()
      this.csvServ.registerUser(user)
        .subscribe(
          () => {
            (<HTMLButtonElement>document.getElementById("registrado")).click()
            setTimeout(() => {

              (<HTMLElement>document.getElementById('registaruser')).classList.remove('modal-open');
              (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('modal-backdrop'))[0].classList.remove('modal-backdrop')
              this._snackBar.dismiss()
            }, 300);
          },
          (res)=> {
            console.log(res)
          })
    }
  }
  /**
   * Metodo listar alumnos
   */
  public listarAlumnos() {
    this.alumnoservice.listarAlumnos().subscribe((response) => {
      response.forEach((element) => {
        this.todosDatos.push({ "dni": element.dniAlumno, "nombre": element.nombreAlumno, "email": element.email, "tipo": "alumno" })
      })
    })
  }
  /**
   * Metodo listar responsable
   */
  public listarResponsables() {
    this.responsableService.listarResponsables().subscribe((response) => {
      response.forEach((element) => {
        this.todosDatos.push({
          "dni": element.dniResponsable, "nombre": element.nombreResponsable
          , "email": element.email, "tipo": "responsable"
        })
      })
    })
  }
  /**
   * Metodo listar profesores
   */
  public listarProfesores() {
    this.profesorService.listarProfesor().subscribe((response) => {
      response.forEach((element) => {
        this.todosDatos.push({
          "dni": element.dniTutor, "nombre": element.nombreTutor
          , "email": element.email, "tipo": "profesor"
        })
      })
    })
  }
  /**
   * Metodo recargar select user 
   */
  public recargarselectuser() {
    this.email = ""
    this.auxTodosDatos = []
    console.log(this.auxTodosDatos)
    this.todosDatos.forEach(element => {
      if (this.perfil == element.tipo) {
        this.auxTodosDatos.push(element)
      }
    });
    console.log(this.auxTodosDatos)
  }
  /**
   * Metodo Guardar email 
   * @param event 
   */
  public guardarEmail(event) {
    this.todosDatos.forEach(element => {
      if (event.source.value == element.dni) {
        this.email = element.email
      }
    });
  }
  /**
   * Metodo snackbar
   */
  public openSnackBar() {
    this._snackBar.open("Registrando...", "Close");
  }
}
