import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno, Centro, Curso, Empresa, Profesor, Responsable } from 'src/app/Shared/interfaces/Interface';
import { ProfesorService } from '../../profesor/profesor.service';
import { ResponsableService } from '../../responsable/responsable.service';
import * as XLSX from 'xlsx'
import { AlumnosService } from '../../alumnos/alumnos.service';
import { EmpresasService } from '../../empresas/empresas.service';
import { CursosService } from '../../cursos/cursos.service';
import { CentrosService } from '../../centros/centros.service';
@Component({
  selector: 'app-insertar-datos',
  templateUrl: './insertar-datos.component.html',
  styleUrls: ['./insertar-datos.component.css']
})
export class InsertarDatosComponent {

  public formcsv: FormGroup
  responsable: any[] = []
  tutores: any[] = []
  centros: any[] = []
  empresas: any[] = []
  cursos: any[] = []
  alumnos: any[] = []
  arrayBuffer: any = []
  fileResponsable: File
  fileTutores: File
  fileCentros: File
  fileEmpresas: File
  fileAlumnos: File
  fileCursos: File
  public constructor(
    private fb: FormBuilder,
    private responsableService: ResponsableService,
    private profesorService: ProfesorService,
    private alumnoService: AlumnosService,
    private empresaService: EmpresasService,
    private cursoService: CursosService,
    private centroService: CentrosService) {
    this.formcsv = this.fb.group({
      empresas: ['', Validators.required],
      centros: ['', Validators.required],
      cursos: ['', Validators.required],
      alumnos: ['', Validators.required],
      resp: ['', Validators.required],
      tutores: ['', Validators.required],

    })
  }

  public insertarDatos() {
    if (this.fileEmpresas != undefined) {
      this.uploadDocument(this.fileEmpresas)
    }
    if (this.fileCentros != undefined) {
      this.uploadDocument(this.fileCentros)
    }
    if (this.fileTutores != undefined) {
      this.uploadDocument(this.fileTutores)
    }
    if (this.fileCursos != undefined) {
      this.uploadDocument(this.fileCursos)
    }
    if (this.fileResponsable != undefined) {
      this.uploadDocument(this.fileResponsable)
    }
    if (this.fileAlumnos != undefined) {
      this.uploadDocument(this.fileAlumnos)
    }
  }
  public filechangedResponsables(event: any) {
    this.fileResponsable = event.target.files[0]
    console.log(this.fileResponsable.name)
  }
  public filechangedTutores(event: any) {
    this.fileTutores = event.target.files[0]
  }
  public filechangedAlumnos(event: any) {
    this.fileAlumnos = event.target.files[0]
  }
  public filechangedCentros(event: any) {
    this.fileCentros = event.target.files[0]
  }
  public filechangedEmpresas(event: any) {
    this.fileEmpresas = event.target.files[0]
    console.log(this.fileEmpresas)
  }
  public filechangedCursos(event: any) {
    this.fileCursos = event.target.files[0]
  }
  public uploadDocument(file) {
    let filename = file.name.substring(0, file.name.length - 4);
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; i++) {
        arr[i] = String.fromCharCode(data[i])
      }
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      if (filename == "responsables") {
        this.insertarResponsablesCSV(arraylist)
      } else if (filename == "tutores") {
        this.insertarTutoresCSV(arraylist)
      } else if (filename == "centros") {
        this.insertarCentrosCSV(arraylist)
      } else if (filename == "empresas") {
        this.insertarEmpresasCSV(arraylist)
      } else if (filename == "alumnos") {
        this.insertarAlumnosCSV(arraylist)
      } else if (filename == "cursos") {
        this.insertarCursosCSV(arraylist)
      }
    }
  }
  public insertarResponsablesCSV(responsable) {
    const responsableObject: Responsable = {
      "id": 0,
      "nombreResponsable": "",
      "dniResponsable": "",
      "email": "",
      "empresa_id": 0
    }

    responsable.forEach(element => {
      responsableObject[0] = element[0]
      responsableObject.dniResponsable = element[1]
      responsableObject.email = element[2]
      responsableObject.empresa_id = element[3]
      this.responsableService.insertarResponsables(responsableObject).subscribe()
      console.log(responsableObject)
    });
  }
  public insertarTutoresCSV(tutores) {
    const tutoresobject: Profesor = {
      "id": 0,
      "nombreTutor": "",
      "dniTutor": "",
      "email": "",
      "codigoCentro": 0
    }
    tutores.forEach(element => {
      tutoresobject.nombreTutor = element.nombreTutor
      tutoresobject.dniTutor = element.dniTutor
      tutoresobject.email = element.email
      tutoresobject.codigoCentro = element.codigoCentro
      this.profesorService.insertarProfesor(tutoresobject).subscribe()

      console.log(tutoresobject)
    });
  }

  public insertarCentrosCSV(responsable) {
    const centroObject: Centro = {
      "codigo":0,
      "nombreCentro":"",
      "provincia": "",
      "localidad": "",
      "calle": "",
      "cp": "",
      "cif": "",
      "telefono":0,
      "email":"",
      "nombreDirector":""
    }

    responsable.forEach(element => {
      centroObject.codigo=element.codigo
      centroObject.nombreCentro = element.nombreCentro
      centroObject.provincia = element.provincia
      centroObject.localidad = element.localidad
      centroObject.calle = element.calle
      centroObject.cp = element.cp
      centroObject.cif = element.cif
      centroObject.telefono = element.telefono
      centroObject.email = element.email
      centroObject.nombreDirector = element.nombreDirector
      this.centroService.insertarCentro(centroObject).subscribe()
      console.log(centroObject)
    });
  }
  public insertarEmpresasCSV(empresa) {
    const empresaObject: Empresa = {
      "id": 0,
      "nombreEmpresa": "",
      "provincia": "",
      "localidad": "",
      "calle": "",
      "cp": "",
      "cif": "",
      "telefono": "",
      "email":"",
      "nombreRepresentante": "",
      "dniRepresentante":""
    }
    empresa.forEach(element => {
      empresaObject.nombreEmpresa = element.nombreEmpresa
      empresaObject.provincia = element.provincia
      empresaObject.localidad = element.localidad
      empresaObject.calle = element.calle
      empresaObject.cp = element.cp
      empresaObject.cif = element.cif
      empresaObject.telefono = element.telefono
      empresaObject.email = element.email
      empresaObject.nombreRepresentante = element.nombreRepresentante
      empresaObject.dniRepresentante = element.dniRepresentante
      this.empresaService.insertarEmpresas(empresaObject).subscribe()
      console.log(empresaObject)
    });
  }
  public insertarAlumnosCSV(alumnos) {
    console.log(alumnos)
    const alumnoObject: Alumno = {
      "id":0,
      "nombreAlumno":"",
      "dniAlumno": "",
      "curso_id": 0,
      "provincia": "",
      "localidad": "",
      "calle": "",
      "cp": 0,
      "email":"",
      "matriculado":1,
    }

    alumnos.forEach(element => {
      alumnoObject.nombreAlumno = element.nombreAlumno
      console.log(element.nombreAlumno)
      alumnoObject.dniAlumno = element.dniAlumno
      alumnoObject.curso_id= element.curso_id
      alumnoObject.provincia = element.provincia
      alumnoObject.localidad = element.localidad
      alumnoObject.calle = element.calle
      alumnoObject.cp = element.cp
      alumnoObject.email = element.email
      this.alumnoService.insertarAlumnos(alumnoObject).subscribe()
      console.log(alumnoObject)
    });
  }
  public insertarCursosCSV(cursos:any[]) {
    const cursoObject: Curso = {
      "id":0,
      "codigoCiclo":"", 
      "familiaProfesional":"", 
      "cicloFormativo":"", 
      "cursoAcademico":"",
      "nHoras":0,
      "tutor_id":0
    }
    cursos.forEach((element) => {
      cursoObject.codigoCiclo = element.codigoCiclo
      cursoObject.familiaProfesional = element.familiaProfesional
      cursoObject.cicloFormativo = element.cicloFormativo
      cursoObject.cursoAcademico = element.cursoAcademico
      cursoObject.nHoras = element.nHoras
      cursoObject.tutor_id = element.tutor_id
      this.cursoService.insertarCurso(cursoObject).subscribe()
      console.log(cursoObject)
    });
  }


}
