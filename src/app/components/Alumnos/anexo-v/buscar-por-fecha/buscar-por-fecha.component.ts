import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-buscar-por-fecha',
  templateUrl: './buscar-por-fecha.component.html',
  styleUrls: ['./buscar-por-fecha.component.css']
})
export class BuscarPorFechaComponent implements OnInit {

  public inicio:any
  public fin:any
  public tareas:any[]=[{
    descripcion:"Formacion NOVA",
    orientacion:"Documentacoion en everFuture",
    tiempo: "07:45",
    dificultad:"facil",
    observaciones:"el Everfuture va lento"
  },
  {
    descripcion:"Formacion NOVA",
    orientacion:"Documentacoion en everFuture",
    tiempo: "06:40",
    dificultad:"dificil",
    observaciones:"el Everfuture va lento"
  },{
    descripcion:"Formacion NOVA",
    orientacion:"Documentacoion en everFuture",
    tiempo: "08:00",
    dificultad:"medio",
    observaciones:"el Everfuture va lento"
  }]
  constructor() { 
  }
  downloadPDF() {
    // Extraemos el
    
    const DATA = <HTMLElement> document.getElementById('pdfdata');
     

    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    (<HTMLElement>document.getElementById("parteSuperior")).style.display=""
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
      docResult.save(`hojaalumno.pdf`);
    });
  }
  ngOnInit(): void {
    (<HTMLElement>document.getElementById("parteSuperior")).style.display="none"
  }
  
  buscarTareas(){
    window.alert("Buscar tareas entre "+this.inicio+" y "+ this.fin)
  }
}
