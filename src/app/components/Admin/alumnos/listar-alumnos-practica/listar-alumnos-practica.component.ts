import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';

import html2canvas from 'html2canvas';
import { Centro, Empresa, FCTAlumno, Responsable } from 'src/app/utils/interfaces/Interface';
import { EmpresasService } from '../../empresas/empresas.service';
import { AlumnosService } from '../alumnos.service';
import { ResponsableService } from '../../responsable/responsable.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CentrosService } from '../../centros/centros.service';
import { Subject ,debounceTime} from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listar-alumnos-practica',
  templateUrl: './listar-alumnos-practica.component.html',
  styleUrls: ['./listar-alumnos-practica.component.css']
})
export class ListarAlumnosPracticaComponent implements OnInit {
  public responsables: Responsable[] = []
  public empresas: Empresa[] = []
  public alumnosfct: FCTAlumno[] = []
  public respdis: boolean = true
  public alumnofct: any = {}
  public nombreCiclo: string = ""
  public alumnosfiltrados: any[] = []
  public cargaCompleta: boolean = false
  public fechaHoy: Date = new Date()
  public debounce: Subject<string> = new Subject<string>()
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


  public constructor(
    private alumnoservice: AlumnosService,
    private empresasevice: EmpresasService,
    private responsableservice: ResponsableService,
    private centroService: CentrosService,
    private _snackBar: MatSnackBar, 
    private router:Router ){

  }
  public ngOnInit(): void {
    this.debounce.pipe(
      debounceTime(2000)
    ).subscribe(
      resp => window.location.reload()
    )
    this.listarAlumnosFct()
    this.listarEmpresas();
    this.listarResponsables();
  }
  public downloadPDF() {
    // Extraemos DATA
    (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("hide"))[0].classList.remove("hide");
    (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("pdf"))[0].style.marginTop="0.8in"

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

  public listarEmpresas() {
    this.empresasevice.listarEmpresas().subscribe((response) => {
      this.empresas = response
    })
  }
  public listarResponsables() {
    this.responsableservice.listarResponsables().subscribe((response) => {
      this.responsables = response

    })
  }
  public listarAlumnosFct() {
    this.alumnoservice.listarAlumnosFCT().subscribe((response) => {
      this.alumnosfct = response
      this.cargaCompleta = true

    })
  }
  public eliminarAlumnoFCT(idAlumno: number) {
    this.alumnoservice.eliminarAlumnoFCT(idAlumno).subscribe(
      () => {
        this.openSnackBar()
        this.listarAlumnosFct()
      })
  }
  public guardarid(idAlumno: FCTAlumno) {
    this.alumnofct.id = idAlumno.id
    this.alumnofct.empresa_id = idAlumno.empresa_id
    this.alumnofct.responsable_id = idAlumno.responsable_id;

    setTimeout(() => {
      (<HTMLElement>document.getElementById('modificar')).classList.remove('modal-open');
      (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('modal-backdrop'))[0].classList.remove('modal-backdrop')
    }, 300);
  }
  public updateSelectResponsable(event: any) {
    console.log(this.alumnofct.responsable_id, "CARGA")
    this.alumnofct.empresa_id = event.value
    this.responsableservice.findResponsablesByEmpresaID(this.alumnofct.empresa_id).subscribe((response) => {
      this.responsables = response
      this.respdis = false
    })
  }
  public saveidResponsable(event: any) {
    this.alumnofct.responsable_id = event.value
  }
  public changeEmpresa(idAlumnoFCT: number) {
    console.log(this.alumnofct.responsable_id, "chane")
    let idresponsable = Number((<HTMLSelectElement>document.getElementById("responsable")).value)
    let idempresa = Number((<HTMLSelectElement>document.getElementById("empresa")).value)
    const alumnofctobject = { "responsable_id": this.alumnofct.responsable_id, "empresa_id": this.alumnofct.empresa_id }
    this.alumnoservice.changeAlumnoDeEmpresa(alumnofctobject, idAlumnoFCT).subscribe((response) => this.listarAlumnosFct());
  }
  public openSnackBar() {
    this._snackBar.open("Eliminado con éxito", "Close",
      {
        duration: 3000
      });
  }

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
          console.log(res)
          this.centro = res
        })

    this.empresasevice.findEmpresaByid(fctalumno.empresa_id)
      .subscribe(
        (res) => {
          console.log(res)
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
      docResult.save(`Anexo0_${this.centro.nombreCentro}_${this.empresa.nombreEmpresa}.pdf`);
    });
  }
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
      docResult.save(`Anexo0_${this.centro.nombreCentro}_${this.empresa.nombreEmpresa}.pdf`);
    });
    
  }
}

