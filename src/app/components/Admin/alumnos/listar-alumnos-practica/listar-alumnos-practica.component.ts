import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { debounceTime, Subject } from 'rxjs';
import { Centro, Empresa, FCTAlumno, Responsable } from 'src/app/utils/interfaces/Interface';
import { CentrosService } from '../../centros/centros.service';
import { EmpresasService } from '../../empresas/empresas.service';
import { ResponsableService } from '../../responsable/responsable.service';
import { AlumnosService } from '../alumnos.service';

/**
 * The listar alumnos practica compnent
 */
@Component({
  selector: 'app-listar-alumnos-practica',
  templateUrl: './listar-alumnos-practica.component.html',
  styleUrls: ['./listar-alumnos-practica.component.css']
})
export class ListarAlumnosPracticaComponent implements OnInit {
  /**
   * Matriz responsables
   */
  public responsables: Responsable[] = []
  /**
   * Matriz empresas
   */
  public empresas: Empresa[] = []
  /**
   * Matriz alumnosfct
   */
  public alumnosfct: FCTAlumno[] = []
  /**
   * deshabilitar select responsable
   */
  public respdis: boolean = true
  /**
   * objeto alumnofct any
   */
  public alumnofct: any = {}
  /**
   * nombre del ciclo
   */
  public nombreCiclo: string = ""
  /**
   * Matriz de alumnos filtrados by empresa y centro
   */
  public alumnosfiltrados: any[] = []
  /**
   * Carga completa
   */
  public cargaCompleta: boolean = false
  /**
   * Fecha actual
   */
  public fechaHoy: Date = new Date()
  /**
   * subject type string
   */
  public debounce: Subject<string> = new Subject<string>()
  /**
   * Objeto centro
   */
  public centro: Centro = {
    "codigo": 0,
    "nombreCentro": "",
    "provincia": "",
    "localidad": "",
    "calle": "",
    "cp": "",
    "cif": "",
    "telefono": 0,
    "email": "",
    "nombreDirector": ""
  }
  /**
   * Objeto empresa
   */
  public empresa: Empresa = {
    "id": 0,
    "nombreEmpresa": "",
    "provincia": "",
    "localidad": "",
    "calle": "",
    "cp": "",
    "cif": "",
    "telefono": "",
    "email": "",
    "nombreRepresentante": "",
    "dniRepresentante": ""
  }
  /**
   * Constructor
   * @param alumnoservice 
   * @param empresasevice 
   * @param responsableservice 
   * @param centroService 
   * @param _snackBar 
   * @param router 
   */
  public constructor(
    private alumnoservice: AlumnosService,
    private empresasevice: EmpresasService,
    private responsableservice: ResponsableService,
    private centroService: CentrosService,
    private _snackBar: MatSnackBar) {

  }
  /**
   * NgOnInit
   */
  public ngOnInit(): void {
    this.debounce.pipe(
      debounceTime(2000)
    ).subscribe(
      () => window.location.reload()
    )
    this.listarAlumnosFct()
    this.listarEmpresas();
    this.listarResponsables();
  }
  /**
   * Descargar lista alumnos en practica en pdf
   */
  public downloadPDF() {
    // Extraemos DATA
    (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("hide"))[0].classList.remove("hide");
    (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("pdf"))[0].style.marginTop = "0.8in"

    const DATA = <HTMLElement>document.getElementById('listaalumnosFCT');
    // Todo elemento que tenga la clase quitar no se mostrara en el pdf
    for (let i = 0; i < (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('quitar')).length; i++) {
      (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('quitar'))[i].style.display = "none"
    }

    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      // Add image Canvas to PDF
      const bufferX = 70;
      const bufferY = 50;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      this.debounce.next("siguiente")
      docResult.save(`AlumnosEnPráctica.pdf`);
    });
  }
  /**
   * Metodo listar empresas
   */
  public listarEmpresas() {
    this.empresasevice.listarEmpresas().subscribe((response) => {
      this.empresas = response
    })
  }
  /**
   * Metodo listar responsables
   */
  public listarResponsables() {
    this.responsableservice.listarResponsables().subscribe((response) => {
      this.responsables = response

    })
  }
  /**
   * Metodo listar alumnos fct
   */
  public listarAlumnosFct() {
    this.alumnoservice.listarAlumnosFCT().subscribe((response) => {
      this.alumnosfct = response
      this.cargaCompleta = true

    })
  }
  /**
   * Metodo eliminar alumnos de la practica
   * @param idAlumno 
   */
  public eliminarAlumnoFCT(idAlumno: number) {
    this.alumnoservice.eliminarAlumnoFCT(idAlumno).subscribe(
      () => {
        this.openSnackBar()
        this.listarAlumnosFct()
      })
  }
  /**
   * Metodo para guardar los ids
   * @param alumnofct 
   */
  public guardarid(alumnofct: FCTAlumno) {
    this.alumnofct.id = alumnofct.id
    this.alumnofct.empresa_id = alumnofct.empresa_id
    this.alumnofct.responsable_id = alumnofct.responsable_id;

    setTimeout(() => {
      (<HTMLElement>document.getElementById('modificar')).classList.remove('modal-open');
      (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('modal-backdrop'))[0].classList.remove('modal-backdrop')
    }, 300);
  }
  /**
   * Metodo modificar las opciones del select responsable
   * @param event 
   */
  public updateSelectResponsable(event: any) {
    this.alumnofct.empresa_id = event.value
    this.responsableservice.findResponsablesByEmpresaID(this.alumnofct.empresa_id).subscribe((response) => {
      this.responsables = response
      this.respdis = false
    })
  }
  /**
   * Metodo guardar id del responsable
   * @param event 
   */
  public saveidResponsable(event: any) {
    this.alumnofct.responsable_id = event.value
  }
  /**
   * metodo para cambiar alumno de empresa
   * @param idAlumnoFCT 
   */
  public changeEmpresa(idAlumnoFCT: number) {

    const alumnofctobject = {
      "responsable_id": this.alumnofct.responsable_id,
      "empresa_id": this.alumnofct.empresa_id
    }
    this.alumnoservice.changeAlumnoDeEmpresa(alumnofctobject, idAlumnoFCT)
      .subscribe(
        () => this.listarAlumnosFct());
  }
  /**
   * Metodo open snackbar al eliminar
   */
  public openSnackBar() {
    this._snackBar.open("Eliminado con éxito", "Close",
      {
        duration: 3000
      });
  }
  /**
   * Metodo para recargar datos en los anexos 0 y 1
   * @param fctalumno 
   */
  public datosAnexo01(fctalumno: FCTAlumno) {
    setTimeout(() => {
      (<HTMLElement>document.getElementById('modificar')).classList.remove('modal-open');
      (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('modal-backdrop'))[0].classList.remove('modal-backdrop')
    }, 300);
    this.alumnofct.codeCiclo = fctalumno.codigoCiclo
    this.alumnoservice.nombreCurso(fctalumno.codigoCiclo)
      .subscribe(
        (res) => {
          this.nombreCiclo = res.cicloFormativo
        })
    this.centroService.findCentroBycode(fctalumno.tutor_id)
      .subscribe(
        (res) => {
          this.centro = res
        })

    this.empresasevice.findEmpresaByid(fctalumno.empresa_id)
      .subscribe(
        (res) => {
          //@ts-ignore
          this.empresa = res
        }
      )
    this.alumnoservice.listarAlumnosFCTBYEmpresaANDCentro(fctalumno.empresa_id, fctalumno.tutor_id)
      .subscribe(
        (res) => {
          this.alumnosfiltrados = res
        }
      )
  }
  /**
   * Metodo genera el anexo I
   */
  public anexo1pdf() {
    // Extraemos DATA
    (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("hideAnexo1"))[0].classList.remove("hideAnexo1")

    const DATA = <HTMLElement>document.getElementById('anexo1pdf');
    (<HTMLElement>document.getElementById('listaalumnosFCT'))?.classList.add("hideAnexo0");
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      this.debounce.next("siguiente")
      docResult.save(`Anexo_I_${this.centro.nombreCentro}_${this.empresa.nombreEmpresa}.pdf`);
    });
  }
  /**
   * Metodo genera el anexo 0
   */
  public anexo0pdf() {
    // Extraemos DATA
    (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("hideAnexo0"))[0].classList.remove("hideAnexo0")

    const DATA = <HTMLElement>document.getElementById('anexo0pdf');
    (<HTMLElement>document.getElementById('listaalumnosFCT'))?.classList.add("hideAnexo0");
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      this.debounce.next("siguiente")
      docResult.save(`Anexo_0_${this.centro.nombreCentro}_${this.empresa.nombreEmpresa}.pdf`);
    });

  }
}

