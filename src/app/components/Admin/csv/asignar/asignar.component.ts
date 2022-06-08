import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno, Centro, Empresa, FCTAlumnoLista, Profesor, Responsable } from 'src/app/utils/interfaces/Interface';
import { customValidatorDNIRegistro } from 'src/app/utils/Validators/otrasValidaciones';
import { AlumnosService } from '../../alumnos/alumnos.service';
import { CentrosService } from '../../centros/centros.service';
import { EmpresasService } from '../../empresas/empresas.service';
import { ProfesorService } from '../../profesor/profesor.service';
import { ResponsableService } from '../../responsable/responsable.service';
import { CsvService } from '../csv.service';
/**
 * The asignar component
 */
@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.css']
})
export class AsignarComponent implements OnInit {
  /**
   * Matriz alumnos
   */
  public alumnos: Alumno[] = [];
  /**
   * Matriz empresas
   */
  public empresas: Empresa[] = [];
  /**
   * Matriz profesor
   */
  public tutores: Profesor[] = [];
  /**
   * Matriz tutores temporal
   */
  public tutoresTmp: Profesor[] = [];
  /**
   * Matriz centros
   */
  public centros: Centro[] = [];
  /**
   * Matriz responsables 
   */
  public responsables: Responsable[] = []
  /**
   * Matriz responsables temporal
   */
  public responsablesTemp: Responsable[] = []
  /**
   * selecionar responsable
   */
  public selectResponsable: boolean = false;
  /**
   * Formulario
   */
  public formAsignar: FormGroup;
  /**
   * Constructor
   * @param fb 
   * @param alumnoservice 
   * @param csvServ 
   * @param empresaService 
   * @param centrosService 
   * @param profesorService 
   * @param respService 
   */
  constructor(private fb: FormBuilder,
    private alumnoservice: AlumnosService,
    private csvServ: CsvService,
    private empresaService: EmpresasService,
    private centrosService: CentrosService,
    private profesorService: ProfesorService,
    private respService: ResponsableService) {
    this.formAsignar = this.fb.group({
      alumno: ['', Validators.required, [customValidatorDNIRegistro.customValidDNIRegistro(csvServ)]],
      empresa: ['', Validators.required],
      tutor: ['', Validators.required],
      responsable: ["", Validators.required],
      centro: ['', Validators.required]
    })
  }
  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.listarAlumnos();
    this.listarEmpresas();
    this.listarCentros();
    this.listartutores();
    this.listarResponsables();
  }
  /**
   * Metodo listar alumnos
   */
  public listarAlumnos() {
    this.alumnoservice.listarAlumnos().subscribe((response) => {
      this.alumnos = response;
    })
  }
  /**
   * Metodo listar empresas
   */
  public listarEmpresas() {
    this.empresaService.listarEmpresas().subscribe((response) => {
      this.empresas = response;

    })
  }
  /**
   * Metodo listar centros
   */
  listarCentros() {
    this.centrosService.listarCentros().subscribe((response) => {
      this.centros = response

    })
  }
  /**
   * Metodo listar tutores
   */
  public listartutores() {
    this.profesorService.listarProfesor().subscribe((response) => {
      this.tutores = response
    })
  }
  /**
   * Metodo listar responsable
   */
  public listarResponsables() {
    this.respService.listarResponsables().subscribe((response) => {
      this.responsables = response

    })
  }
  /**
   * Metodo cargar select
   * @param id 
   */
  public cargarSelectResponsables(id: any) {
    this.responsablesTemp = this.responsables.filter(responsable => responsable.empresa_id == id.value)
  }
  /**
   * Metodo cargar select tutores
   * @param id 
   */
  public cargarSelectTutores(id: any) {
    this.tutoresTmp = this.tutores.filter(tutor => tutor.codigoCentro == id.source.value)
  }
  /**
   * Metodo asignar practicas
   */
  public asignarPractica() {
    const fctalumno: FCTAlumnoLista = {
      "id": 0,
      "alumno_id": this.formAsignar.value.alumno,
      "empresa_id": this.formAsignar.value.empresa,
      "responsable_id": this.formAsignar.value.responsable,
      "tutor_id": this.formAsignar.value.tutor,
      "codigoCentro": this.formAsignar.value.centro
    }
    if (this.formAsignar.valid) {
      this.csvServ.insetarfctalumno(fctalumno)
        .subscribe(
          () => {
            (<HTMLButtonElement>document.getElementById("insertado")).click()
            setTimeout(() => {
              (<HTMLElement>document.getElementById('asignarEmpresa')).classList.remove('modal-open');
              (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('modal-backdrop'))[0].classList.remove('modal-backdrop')
            }, 300);
          })
    }
  }
}
