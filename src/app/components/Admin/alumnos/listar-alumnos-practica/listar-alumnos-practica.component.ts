import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';

import html2canvas from 'html2canvas';
import { Empresa, FCTAlumno, FCTAlumnoLista, Responsable } from 'src/app/Shared/interfaces/Interface';
import { EmpresasService } from '../../empresas/empresas.service';
import { AlumnosService } from '../alumnos.service';
import { ResponsableService } from '../../responsable/responsable.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  public selected = "domain"
  public cargaCompleta: boolean = false

  public constructor(
    private alumnoservice: AlumnosService,
    private empresasevice: EmpresasService,
    private responsableservice: ResponsableService,
    private _snackBar: MatSnackBar) {

  }
  public downloadPDF() {
    // Extraemos DATA
    (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("hide"))[0].classList.remove("hide")

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
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`alumnosPráctica.pdf`);
    });
  }
  public ngOnInit(): void {
    this.listarAlumnosFct()
    this.listarEmpresas();
    this.listarResponsables();
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
}
