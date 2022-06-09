import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/Shared/shared.service';
import { Centro, Profesor } from 'src/app/utils/interfaces/Interface';
import { customValidatordDni, customValidatorEmail, customValidatorFormatDNI } from 'src/app/utils/Validators/otrasValidaciones';
import { CentrosService } from '../../centros/centros.service';
import { ProfesorService } from '../profesor.service';
/**
 * The insetar profesor component
 */
@Component({
  selector: 'app-insertar-profesor',
  templateUrl: './insertar-profesor.component.html',
  styleUrls: ['./insertar-profesor.component.css']
})
export class InsertarProfesorComponent implements OnInit {
  /**
   * Matriz de centros
   */
  public centros: Centro[] = []
  /**
   * Formulario
   */
  public forminsertarProfesor: FormGroup;
  /**
   * Constructor
   * @param fb 
   * @param profesorService 
   * @param centroService 
   * @param sharedService 
   */
  constructor(
    private fb: FormBuilder,
    private profesorService: ProfesorService,
    private centroService: CentrosService,
    sharedService: SharedService) {

    this.forminsertarProfesor = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern("[A-Z a-z]{3,}")]],
      dni: ['', [Validators.required, Validators.pattern("[0-9]{8}[A-Z]{1}")],
        [customValidatordDni.customValidDni(sharedService), customValidatorFormatDNI.customValidDNILETRA], 'blur'],
      centro: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
        [customValidatorEmail.customValidEmail(sharedService)], 'blur']
    })
  }
  /**
   * NgOnInit
   */
  public ngOnInit(): void {
    this.listarCentros()
  }
  /**
   * metodo insertar profesor
   */
  public insertarProfesor() {
    const profesor: Profesor = {
      "id": 0,
      "nombreTutor": this.forminsertarProfesor.value.nombre,
      "dniTutor": this.forminsertarProfesor.value.dni,
      "email": this.forminsertarProfesor.value.email,
      "codigoCentro": this.forminsertarProfesor.value.centro
    }
    if (this.forminsertarProfesor.valid) {
      this.profesorService.insertarProfesor(profesor).subscribe(
        () => {
          (<HTMLButtonElement>document.getElementById("insertado")).click()
          setTimeout(() => {
            (<HTMLElement>document.getElementById('insertarTutor')).classList.remove('modal-open');
            (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('modal-backdrop'))[0].classList.remove('modal-backdrop')
          }, 300);
          this.profesorService.listarProfesor();
        }
      );
    }
  }
  /**
   * Metodo listar centros
   */
  public listarCentros() {
    this.centroService.listarCentros().subscribe((response) => {
      this.centros = response
    })
  }
} 
