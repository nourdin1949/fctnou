import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.component.html',
  styleUrls: ['./listar-alumnos.component.css']
})
export class ListarAlumnosComponent implements OnInit {
  public cursos: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  public alumnosCurso: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  public empresas: string[] = ["NTTDATA", "EVERIS", "VIEWNEXT", "FCTR"]
  constructor() {
 
  }
  downloadPDF() {
    // Extraemos el
    
    const DATA = <HTMLElement> document.getElementById('listaAlumnos');
   
     DATA.getElementsByTagName("th")[DATA.getElementsByTagName("th").length-1].style.display="none"
    for (let i = 0; i <  DATA.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length; i++) {
  let  c =  DATA.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td").length-1
      DATA.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[c].style.display="none"
      let  v =  DATA.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td").length-2
      DATA.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[v].style.display="none"
      
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
  ngOnInit(): void {
  }

}
