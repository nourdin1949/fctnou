import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProfesorService } from '../../profesor/profesor.service';
import { ResponsableService } from '../../responsable/responsable.service';
import * as XLSX from 'xlsx'
import { AlumnosService } from '../../alumnos/alumnos.service';
import { EmpresasService } from '../../empresas/empresas.service';
import { CursosService } from '../../cursos/cursos.service';
import { CentrosService } from '../../centros/centros.service';
import { ValidarFileAlumnos, ValidarFileCentros, ValidarFileCursos, ValidarFileEmpresa, ValidarFileResponsables, ValidarFileTutores } from 'src/app/utils/ValidacionesFicheross';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-insertar-datos',
  templateUrl: './insertar-datos.component.html',
  styleUrls: ['./insertar-datos.component.css']
})
export class InsertarDatosComponent {

  public formcsv: FormGroup
  public arrayBuffer: any = []
  public fileResponsable: File
  public fileTutores: File
  public fileCentros: File
  public fileEmpresas: File
  public fileAlumnos: File
  public fileCursos: File
  public empresaCorrecto: number = 0
  public responsableCorrecto: number = 0
  public tutoresCorrecto: number = 0
  public alumnosCorrecto: number = 0
  public centrosCorrecto: number = 0
  public cursosCorrecto: number = 0
  public empresaFallo: number = 0
  public responsableFallo: number = 0
  public tutoresFallo: number = 0
  public alumnosFallo: number = 0
  public centrosFallo: number = 0
  public cursosFallo: number = 0
  public inputsWithValue: number = 0
  public ficherosleidos: number = 0
  public centroValid: boolean = false
  public empresaValid: boolean = false
  public cursoValid: boolean = false
  public tutorValid: boolean = false
  public responsableValid: boolean = false
  public alumnoValid: boolean = false
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
      resp: ['', ,ValidarFileResponsables.filevalidator],
      tutores: ['', ,ValidarFileTutores.filevalidator],

    })
  }
  public openSnackBar() {
    this._snackBar.open("Insertando datos...", "close");
  }
  public insertarDatos(event) {
    this.restablecerContadores()

    // Contar los inputs type file que no están vaciones
    for (let i = 0; i < event.target.length - 1; i++) {
      if (event.target[i].value != "") this.inputsWithValue++
    }
    this.validarExtensiones()
    console.log(this.formcsv.value.empresas._fileNames)
    console.log(this.formcsv.value.empresas)
    // Comprobamos si el formulario es válido
    if (!this.cursoValid && !this.empresaValid && !this.tutorValid &&
      !this.centroValid && !this.alumnoValid && !this.responsableValid) {
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
  }
  public filechangedResponsables(event: any) {
    this.fileResponsable = event.target.files[0]
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
  }

  public filechangedCursos(event: any) {
    this.fileCursos = event.target.files[0]
  }

  public uploadDocument(file) {
    
    let filename = file.name.substring(0, file.name.length - 4);
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file);
    console.log(fileReader)
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

  public insertarResponsablesCSV(responsable) {

    responsable.forEach(element => {

      this.responsableService.insertarResponsables(element)
        .subscribe(
          () => {
            this.responsableCorrecto++
            console.log("correcto res")
          },
          (res) => {
            this.responsableFallo++
            console.log("fallo res", res)
          })
    });

    let respint = setInterval(() => {
      console.log("resp:" + responsable.length, "c" + this.responsableCorrecto, "f" + this.responsableFallo)

      if (responsable.length == (this.responsableCorrecto + this.responsableFallo) || responsable.length == 0) {
        this.ficherosleidos++

        this.mostrarModal()
        clearInterval(respint)
      }
    }, 3000);
  }
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

  public insertarAlumnosCSV(alumnos) {
    alumnos.forEach(element => {
      this.alumnoService.insertarAlumnos(element)
        .subscribe(
          () => {
            this.alumnosCorrecto++
          },
          (res) => {
            this.alumnosFallo++
            console.log("alumno")
          })
    });
    let alumnointerval = setInterval(() => {
      console.log("alumn:" + alumnos.length, "c" + this.alumnosCorrecto, "f" + this.alumnosFallo)

      if (alumnos.length == (this.alumnosCorrecto + this.alumnosFallo) || alumnos.length == 0) {
        this.ficherosleidos++

        this.mostrarModal()
        clearInterval(alumnointerval)
      }
    }, 1000);
  }
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
      console.log("curs:" + cursos.length, "c" + this.cursosCorrecto, "f" + this.cursosFallo)
      let total = this.cursosCorrecto + this.cursosFallo
      if (cursos.length == (total) || cursos.length == 0) {
        this.ficherosleidos++

        this.mostrarModal()
        clearInterval(cursointe)
      }
    }, 1000);
  }

  public mostrarModal() {
    if (this.ficherosleidos == this.inputsWithValue) {
      this._snackBar.dismiss();
      (<HTMLButtonElement>document.getElementById("insertado")).click();
      (<HTMLElement>document.getElementById('insertarCSV')).classList.remove('modal-open');
      (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('modal-backdrop'))[0].classList.remove('modal-backdrop')
    }
  }

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
    this.empresaValid = false
    this.centroValid = false
    this.cursoValid = false
    this.responsableValid = false
    this.tutorValid = false
    this.alumnoValid = false
  }
  public validarExtensiones() {
    if (this.fileEmpresas != undefined && this.fileEmpresas.name != "empresas.csv") {
      this.empresaValid = true
    }
    if (this.fileCentros != undefined && this.fileCentros.name.substring(this.fileCentros.name.length - 4,) != ".csv") {
      this.centroValid = true
    }
    if (this.fileCursos != undefined && this.fileCursos.name.substring(this.fileCursos.name.length - 4,) != ".csv") {
      this.cursoValid = true
    }
    if (this.fileTutores != undefined && this.fileTutores.name.substring(this.fileTutores.name.length - 4,) != ".csv") {
      this.tutorValid = true
    }
    if (this.fileResponsable != undefined && this.fileResponsable.name.substring(this.fileResponsable.name.length - 4,) != ".csv") {
      this.responsableValid = true
    }
    if (this.fileAlumnos != undefined && this.fileAlumnos.name.substring(this.fileAlumnos.name.length - 4,) != ".csv") {
      this.alumnoValid = true
    }
  }
}
