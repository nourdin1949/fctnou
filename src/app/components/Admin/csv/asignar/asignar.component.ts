import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno, Centro, Empresa, FCTAlumnoLista, Profesor, Responsable } from 'src/app/Shared/interfaces/Interface';
import { AlumnosService } from '../../alumnos/alumnos.service';
import { CentrosService } from '../../centros/centros.service';
import { EmpresasService } from '../../empresas/empresas.service';
import { ProfesorService } from '../../profesor/profesor.service';
import { ResponsableService } from '../../responsable/responsable.service';
import { CsvService } from '../csv.service';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.css']
})
export class AsignarComponent implements OnInit {
  public alumnos: Alumno[] = [];
  public empresas: Empresa[] = [];
  public tutores: Profesor[] = [];
  public centros: Centro[] = [];
  public responsables: Responsable[] = []
  public selectResponsable: boolean = false;

  public formAsignar: FormGroup;
  constructor(private fb: FormBuilder,
    private alumnoservice: AlumnosService,
    private csvServ: CsvService,
    private empresaService: EmpresasService,
    private centrosService: CentrosService,
    private profesorService: ProfesorService,
    private respService: ResponsableService) {
    this.formAsignar = this.fb.group({
      alumno: ['0', Validators.required],
      empresa: ['0', Validators.required],
      tutor: ['0', Validators.required],
      responsable: ["0", Validators.required],
      centro: ['0', Validators.required]

    })
  }

  ngOnInit(): void {
    this.listarAlumnos();
    this.listarEmpresas();
    this.listarCentros();
    this.listartutores();
    this.listarResponsables();
  }
  listarAlumnos() {
    this.alumnoservice.listarAlumnos().subscribe((response) => {
      this.alumnos = response;
    })
  }

  listarEmpresas() {
    this.empresaService.listarEmpresas().subscribe((response) => {
      this.empresas = response;
    })
  }
  listarCentros() {
    this.centrosService.listarCentros().subscribe((response) => {
      this.centros = response
    })
  }
  listartutores() {
    this.profesorService.listarProfesor().subscribe((response) => {
      this.tutores = response
    })
  }
  listarResponsables() {
    this.respService.listarResponsables().subscribe((response) => {
      this.responsables = response
    })
  }
  cargarSelectResponsables(id: any) {
    this.responsables = this.responsables.filter(responsable => responsable.empresa_id == id)
  }
  cargarSelectTutores(id: any) {
    this.tutores = this.tutores.filter(tutor => tutor.codigoCentro == id.target.value)
  }
  asignarPractica() {
    console.log(this.formAsignar.value)
    const fctalumno: FCTAlumnoLista = {
      "id": 0,
      "alumno_id": this.formAsignar.value.alumno,
      "empresa_id": this.formAsignar.value.empresa,
      "responsable_id": this.formAsignar.value.responsable,
      "tutor_id": this.formAsignar.value.tutor,
      "codigoCentro": this.formAsignar.value.centro
    }
    console.log(fctalumno)
    if (this.formAsignar.valid) {
      this.csvServ.insetarfctalumno(fctalumno).subscribe((response) => {
        console.log(1)
      })
    }
  }
}
