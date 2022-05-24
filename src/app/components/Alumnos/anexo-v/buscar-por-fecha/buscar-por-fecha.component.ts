import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AnexoVService } from '../anexo-v.service';
import { Tarea } from 'src/app/Shared/interfaces/Interface';
@Component({
  selector: 'app-buscar-por-fecha',
  templateUrl: './buscar-por-fecha.component.html',
  styleUrls: ['./buscar-por-fecha.component.css']
})
export class BuscarPorFechaComponent implements OnInit {
  public datos :any=[]
  public inicio:string=""
  public fin:string=""
  public tareas:Tarea[]=[]
  public buscar:boolean=false
  constructor(private anexovService:AnexoVService) { 

  }
  downloadPDF() {
    // Extraemos el
    
    const DATA = <HTMLElement> document.getElementById('pdfdata');
     

    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("hide"))[0].classList.remove("hide")
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
      docResult.save(`nombreAlumno_de_${this.inicio}_a_${this.fin}.pdf`);
    });
  }
  ngOnInit(): void {
   setTimeout(() => {
    this.semanal()
   }, 600);
  }
  
  buscarTareas(){
    this.buscar=true
    const objetoFechas ={
      "primeraFecha":this.inicio,
      "segundaFecha":this.fin,
    }
    let idAlumno= sessionStorage.getItem('id');
    this.anexovService.listarTareasEntreFechas(objetoFechas, idAlumno)
      .subscribe((res)=>{this.tareas=res
        this.buscar=false
      })
  }
  public semanal(){
    this.anexovService.fichasemanal().subscribe((res)=>{
      this.datos= res
      console.log(res)
    })
  }
}
