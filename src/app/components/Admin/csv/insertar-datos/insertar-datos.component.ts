import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ProfesorService } from '../../profesor/profesor.service';
import { ResponsableService } from '../../responsable/responsable.service';
import * as XLSX from 'xlsx'
import { AlumnosService } from '../../alumnos/alumnos.service';
import { EmpresasService } from '../../empresas/empresas.service';
import { CursosService } from '../../cursos/cursos.service';
import { CentrosService } from '../../centros/centros.service';
import { ValidarFileAlumnos, ValidarFileCentros, ValidarFileCursos, ValidarFileEmpresa, ValidarFileResponsables, ValidarFileTutores } from 'src/app/utils/Validators/ValidacionesFicheross';
import { MatSnackBar } from '@angular/material/snack-bar';
/**
 * The insertar datos component
 */
@Component({
  selector: 'app-insertar-datos',
  templateUrl: './insertar-datos.component.html',
  styleUrls: ['./insertar-datos.component.css']
})
export class InsertarDatosComponent {
  /**
   * Formulario
   */
  public formcsv: FormGroup
  /**
   * Array buffer bob
   */
  public arrayBuffer: any = []
  /**
   * file responsable
   */
  public fileResponsable: any
  /**
   * file tutores
   */
  public fileTutores: any
  /**
   * file centros
   */
  public fileCentros: any
  /**
   * file empresas
   */
  public fileEmpresas: any
  /**
   * file alumnos
   */
  public fileAlumnos: any
  /**
   * file cursos
   */
  public fileCursos: any
  /**
   *  contador de inserciciones correctas empresa
   */
  public empresaCorrecto: number = 0
  /**
   *  contador de inserciciones correctas responsable
   */
  public responsableCorrecto: number = 0
  /**
   *  contador de inserciciones correctas tutores
   */
  public tutoresCorrecto: number = 0
  /**
   *  contador de inserciciones correctas alumnos
   */
  public alumnosCorrecto: number = 0
  /**
   *  contador de inserciciones correctas centros
   */
  public centrosCorrecto: number = 0
  /**
   *  contador de inserciciones correctas cursos
   */
  public cursosCorrecto: number = 0
  /**
   *  contador de inserciciones fallos empresa
   */
  public empresaFallo: number = 0
  /**
  *  contador de inserciciones fallos responsables
  */
  public responsableFallo: number = 0
  /**
  *  contador de inserciciones fallos tutores
  */
  public tutoresFallo: number = 0
  /**
  *  contador de inserciciones fallos alumnos
  */
  public alumnosFallo: number = 0
  /**
  *  contador de inserciciones fallos centros
  */
  public centrosFallo: number = 0
  /**
  *  contador de inserciciones fallos cursos
  */
  public cursosFallo: number = 0
  /**
  * input files con valor
  */
  public inputsWithValue: number = 0
  /**
   * contador ficheros leidos
   */
  public ficherosleidos: number = 0
  /**
   * Validad file centro
   */
  public centroValid: boolean = false
  /**
   * Validad file empresa
   */
  public empresaValid: boolean = false
  /**
   * Validad file curso
   */
  public cursoValid: boolean = false
  /**
   * Validad file tutor
   */
  public tutorValid: boolean = false
  /**
   * Validad file responsable
   */
  public responsableValid: boolean = false
  /**
   * Validad file alumno
   */
  public alumnoValid: boolean = false
  /**
   * val
   */
  @ViewChild("form") form :ElementRef
  /**
   * Constructor
   * @param fb 
   * @param responsableService 
   * @param profesorService 
   * @param alumnoService 
   * @param empresaService 
   * @param cursoService 
   * @param centroService 
   * @param _snackBar 
   */
  public constructor(
    private fb: FormBuilder,
    private responsableService: ResponsableService,
    private profesorService: ProfesorService,
    private alumnoService: AlumnosService,
    private empresaService: EmpresasService,
    private cursoService: CursosService,
    private centroService: CentrosService,
    private _snackBar: MatSnackBar) {
    this.formcsv = this.fb.group({
      empresas: ['', , ValidarFileEmpresa.filevalidator],
      centros: ['', , ValidarFileCentros.filevalidator],
      cursos: ['', , ValidarFileCursos.filevalidator],
      alumnos: ['', , ValidarFileAlumnos.filevalidator],
      resp: ['', , ValidarFileResponsables.filevalidator],
      tutores: ['', , ValidarFileTutores.filevalidator],

    })
  }
  /**
   * metodo snack bar
   */
  public openSnackBar() {
    this._snackBar.open("Insertando datos...", "close");
  }
  /**
   * Metodo open snack bar inserccion incorrecta
   */
  public opensnachbarInserccion() {
    this._snackBar.open("Inserte mínimo 1 fichero","",{
      duration: 4000,
      panelClass: ["insertarminimo"]
    });
  }
  /**
   * Metodo insertar  files
   * @param event 
   */
  public insertarDatos(event) {
    this.restablecerContadores()

    // Contar los inputs type file que no están vaciones
    for (let i = 0; i < event.target.length - 1; i++) {
      if (event.target[i].value != "") this.inputsWithValue++
    }
    // Comprobamos si el formulario es válido
    if (this.inputsWithValue>0) {
     
      if (this.fileEmpresas != undefined && this.formcsv.value.empresas._fileNames== "empresas.csv") {
        this.uploadDocument(this.formcsv.value.empresas._files[0])
      }
      if (this.fileCentros != undefined && this.formcsv.value.centros._fileNames =="centros.csv" ) {
        this.uploadDocument(this.formcsv.value.centros._files[0])
      }
      if (this.fileCursos != undefined && this.formcsv.value.cursos._fileNames=="cursos.csv") {
        this.uploadDocument(this.formcsv.value.cursos._files[0])
      }
      if (this.fileTutores != undefined && this.formcsv.value.tutores._fileNames=="tutores.csv"  ) {
        this.uploadDocument(this.formcsv.value.tutores._files[0])
      }
      if (this.fileResponsable != undefined && this.formcsv.value.resp._fileNames=="responsables.csv") {
        this.uploadDocument(this.formcsv.value.resp._files[0])
      }
      if (this.fileAlumnos != undefined && this.formcsv.value.alumnos._fileNames =="alumnos.csv" ) {
        this.uploadDocument(this.formcsv.value.alumnos._files[0])
      }
      
    }else{
      this.opensnachbarInserccion()
    }
  }
  /**
   * Metodo guardar file responsables
   * @param event 
   */
  public filechangedResponsables(event: any) {
    this.fileResponsable = event.target.files[0]
  }
  /**
   * Metodo guardar file tutores
   * @param event 
   */
  public filechangedTutores(event: any) {
    this.fileTutores = event.target.files[0]
  }
  /**
   * Metodo guardar file alumnos
   * @param event 
   */
  public filechangedAlumnos(event: any) {
    this.fileAlumnos = event.target.files[0]
  }
  /**
   * Metodo guardar file centros
   * @param event 
   */
  public filechangedCentros(event: any) {
    this.fileCentros = event.target.files[0]
    console.log()
console.log(this.fileCentros)
  }
  /**
   * Metodo guardar file empresas
   * @param event 
   */
  public filechangedEmpresas(event: any) {
    this.fileEmpresas = event.target.files[0]
  }
  /**
   * Metodo guardar file cursos
   * @param event 
   */
  public filechangedCursos(event: any) {
    this.fileCursos = event.target.files[0]
  }
  /**
   * Metodo para leer file
   * @param file 
   */
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
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      switch (filename) {
        case 'empresas':
          this.insertarEmpresasCSV(arraylist);
          break;
        case 'centros':
          this.insertarCentrosCSV(arraylist);
          break;
        case 'cursos':
          this.insertarCursosCSV(arraylist);
          break;
        case 'tutores':
          this.insertarTutoresCSV(arraylist);
          break;
        case 'responsables':
          this.insertarResponsablesCSV(arraylist);
          break;
        case 'alumnos':
          this.insertarAlumnosCSV(arraylist);
          break;
      }
      this.openSnackBar()
    }
  }
  /**
   * Metodo insertar responsable csv
   * @param responsable 
   */
  public insertarResponsablesCSV(responsable) {

    responsable.forEach(element => {

      this.responsableService.insertarResponsables(element)
        .subscribe(
          () => {
            this.responsableCorrecto++
          },
          (res) => {
            this.responsableFallo++
          })
    });
    let respint = setInterval(() => {
      if (responsable.length == (this.responsableCorrecto + this.responsableFallo) || responsable.length == 0) {
        this.ficherosleidos++
        this.mostrarModal()
        clearInterval(respint)
      }
    }, 3000);
  }
  /**
   * metodo insertar tutoress csv
   */
  public insertarTutoresCSV(tutores) {

    tutores.forEach(element => {

      this.profesorService.insertarProfesor(element)
        .subscribe(
          () => {
            this.tutoresCorrecto++
            console.log("correcto tutor")
          },
          (res) => {
            this.tutoresFallo++
            console.log("fallo tutor", res)
          })
    });
    let tutoresinter = setInterval(() => {
      console.log("tuto:" + tutores.length, "c" + this.tutoresCorrecto, "f" + this.tutoresFallo)

      if (tutores.length == (this.tutoresFallo + this.tutoresCorrecto) || tutores.length == 0) {
        this.ficherosleidos++

        this.mostrarModal()
        clearInterval(tutoresinter)
      }
    }, 1000);
  }
  /**
   * Metodo insertar centros csv
   * @param centros 
   */
  public insertarCentrosCSV(centros) {
    centros.forEach(element => {
      this.centroService.insertarCentro(element)
        .subscribe(
          () => {
            this.centrosCorrecto++
            console.log("correcto centr")
          },
          (res) => {
            this.centrosFallo++

            console.log(this.centrosFallo, "fallo centorr", res)
          })

    });
    let centrointer = setInterval(() => {
      console.log("centro:" + centros.length, "c" + this.centrosCorrecto, "f" + this.centrosFallo)

      if (centros.length == (this.centrosFallo + this.centrosCorrecto) || centros.length == 0) {
        this.ficherosleidos++

        this.mostrarModal()
        clearInterval(centrointer)
      }
    }, 1000);
  }
  /**
   * Metodo de insertar emoresa csv
   * @param empresa 
   */
  public insertarEmpresasCSV(empresa) {

    empresa.forEach(element => {

      this.empresaService.insertarEmpresas(element)
        .subscribe(
          () => {
            this.empresaCorrecto++
          },
          (RES) => {
            console.log(RES)
            this.empresaFallo++
          })
    });
    let empresainter = setInterval(() => {
      console.log("emp:" + empresa.length, "c" + this.empresaCorrecto, "f" + this.empresaFallo)

      if (empresa.length == (this.empresaFallo + this.empresaCorrecto) || empresa.length == 0) {
        this.ficherosleidos++

        this.mostrarModal()
        clearInterval(empresainter)
      }
    }, 1000);
  }
  /**
   * Metodo para insertar alumnos
   * @param alumnos 
   */
  public insertarAlumnosCSV(alumnos) {
    alumnos.forEach(element => {
      this.alumnoService.insertarAlumnos(element)
        .subscribe(
          () => {
            this.alumnosCorrecto++
          },
          (res) => {
            this.alumnosFallo++
          })
    });
    let alumnointerval = setInterval(() => {

      if (alumnos.length == (this.alumnosCorrecto + this.alumnosFallo) || alumnos.length == 0) {
        this.ficherosleidos++

        this.mostrarModal()
        clearInterval(alumnointerval)
      }
    }, 1000);
  }
  /**
   * Metodo insertar curso csv
   * @param cursos 
   */
  public insertarCursosCSV(cursos) {
    cursos.forEach((element) => {
      this.cursoService.insertarCurso(element)
        .subscribe(
          () => {
            this.cursosCorrecto++
          },
          () => {
            this.cursosFallo++
          })
    });
    let cursointe = setInterval(() => {
      let total = this.cursosCorrecto + this.cursosFallo
      if (cursos.length == (total) || cursos.length == 0) {
        this.ficherosleidos++

        this.mostrarModal()
        clearInterval(cursointe)
      }
    }, 1000);
  }
  /**
   * Mostrar mmodal metodo
   */
  public mostrarModal() {
    if (this.ficherosleidos == this.inputsWithValue) {
      this._snackBar.dismiss();
      (<HTMLButtonElement>document.getElementById("insertado")).click();
      (<HTMLElement>document.getElementById('insertarCSV')).classList.remove('modal-open');
      (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('modal-backdrop'))[0].classList.remove('modal-backdrop')
    }
  }
  /**
   * Metodo reseteo de valores
   */
  public restablecerContadores() {
    this.empresaCorrecto = 0
    this.responsableCorrecto = 0
    this.tutoresCorrecto = 0
    this.alumnosCorrecto = 0
    this.centrosCorrecto = 0
    this.cursosCorrecto = 0
    this.empresaFallo = 0
    this.responsableFallo = 0
    this.tutoresFallo = 0
    this.alumnosFallo = 0
    this.centrosFallo = 0
    this.cursosFallo = 0
    this.inputsWithValue = 0
    this.ficherosleidos = 0
  }
  /**
   * Metodo vaciar inputs file
   */
  public emptyInput() {
    for (let i = 0; i < this.form.nativeElement.length - 1; i++) {
      this.form.nativeElement[i].value=""
    }
    this.formcsv.controls['empresas'].setValue('')
    this.formcsv.controls['centros'].setValue('')
    this.formcsv.controls['tutores'].setValue('')
    this.formcsv.controls['resp'].setValue('')
    this.formcsv.controls['cursos'].setValue('')
    this.formcsv.controls['alumnos'].setValue('')
  }
}
