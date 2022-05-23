import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlug from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { Router } from '@angular/router';
import { AnexoVService } from '../anexo-v.service';
import { Tarea } from 'src/app/Shared/interfaces/Interface';
@Component({
  selector: 'app-calendario-anexo-v',
  templateUrl: './calendario-anexo-v.component.html',
  styleUrls: ['./calendario-anexo-v.component.css']
})
export class CalendarioAnexoVComponent implements OnInit {
  public tareas:Tarea[]=[]
  public events!: any[]
  public options!: any
  public idAlumno = sessionStorage.getItem('id')
  constructor(private router:Router, private anexoVService:AnexoVService) {

  }
  ngOnInit(): void {
    let variable = this.router;
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlug],
      defaultDate: new Date(),
      locale: esLocale,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,timeGridDay'
      },
      editable: true,
      dateClick: function(info) {
        let router= variable
        router.navigateByUrl(`alumno/insertar/${info.dateStr}`)

      },
    }
   setTimeout(() => {
    this.listarAlumnos()
   }, 600);
    
  }
  public listarAlumnos(){
    this.anexoVService.listarAlumnos().subscribe((response)=>{
      this.tareas= response;
      console.log("dentro", this.tareas)
      this.cargarCalendario()
    })
  }

  public cargarCalendario(){
    
    this.events=[]
    this.tareas.forEach((e)=>{
      let titulo=e.descripcion.slice(0,20)
      let fecha=e.fecha
      let color = ""
      let estado = e.validadoResponsable+String(e.validadoTutor)
      console.log("estado", estado)
      switch(estado){
        case "01":
          color="orange";
          break;
        case "11":
          color="green";
          break;
        case "00":
          color="red"
          break;
        case "10":
        color="orange";
        break;
      }
     
      this.events.push({
        title: titulo,
        url:`http://localhost:1949/alumno/modificar/${fecha}/${e.id}`,
        start:moment(fecha).format("YYYY-MM-DD"),
        description: e.descripcion,
        color:color,
        icon:'fa-save'
      })
      
    })
  }
}
