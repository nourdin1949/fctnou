import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';

import html2canvas from 'html2canvas';
import { Empresa, FCTAlumno, FCTAlumnoLista, Responsable } from 'src/app/Shared/interfaces/Interface';
import { EmpresasService } from '../../empresas/empresas.service';
import { AlumnosService } from '../alumnos.service';
import { ResponsableService } from '../../responsable/responsable.service';
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
  public constructor(
    private alumnoservice: AlumnosService,
    private empresasevice: EmpresasService,
    private responsableservice: ResponsableService) {

  }
  public downloadPDF() {
    // Extraemos el

    const DATA = <HTMLElement>document.getElementById('listaAlumnos');

    DATA.getElementsByTagName("th")[DATA.getElementsByTagName("th").length - 1].style.display = "none"
    for (let i = 0; i < DATA.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length; i++) {
      let c = DATA.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td").length - 1

      DATA.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[c].style.display = "none"

      let v = DATA.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td").length - 2
      DATA.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[v].style.display = "none"

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
      console.log(this.alumnosfct)
    })
  }
  public eliminarAlumnoFCT(idAlumno: number) {
    window.alert(idAlumno)
    // this.alumnoservice.eliminarAlumnoFCT(idAlumno).subscribe((response)=>{
    //   this.listarAlumnosFct()
    // })
  }
  public guardarid(idAlumno: FCTAlumno) {
    console.log(idAlumno, "jhjjj")
    this.alumnofct.id = idAlumno.id
    this.alumnofct.empresa_id = idAlumno.empresa_id
    this.alumnofct.responsable_id = idAlumno.responsable_id
    window.alert(this.alumnofct.id + " e mprs " + this.alumnofct.empresa_id + " res " + this.alumnofct.responsable_id)
  }
  public updateSelectResponsable(event: any) {
    this.alumnofct.empresa_id= event.target.value
    this.responsableservice.findResponsablesByEmpresaID(this.alumnofct.empresa_id).subscribe((response) => {
      this.responsables = response
      this.respdis = false
    })
  }
  public changeEmpresa(idAlumnoFCT: number) {
    let idresponsable =Number( (<HTMLSelectElement>document.getElementById("responsable")).value)
    let idempresa = Number((<HTMLSelectElement>document.getElementById("empresa")).value)
    const alumnofctobject = { "responsable_id": idresponsable, "empresa_id": this.alumnofct.empresa_id }
    console.log(alumnofctobject)
    this.alumnoservice.changeAlumnoDeEmpresa(alumnofctobject, idAlumnoFCT).subscribe((response)=>this.listarAlumnosFct());
  }
}
