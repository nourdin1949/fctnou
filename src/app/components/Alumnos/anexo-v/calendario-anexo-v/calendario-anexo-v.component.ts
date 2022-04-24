import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlug from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
@Component({
  selector: 'app-calendario-anexo-v',
  templateUrl: './calendario-anexo-v.component.html',
  styleUrls: ['./calendario-anexo-v.component.css']
})
export class CalendarioAnexoVComponent implements OnInit {
  public tareas:any[]=[
    {
      fecha:"2022-04-01",
      titulo:"Tarea 1",
      estado:"tutor"
    },
    {
      fecha:"2022-04-12",
      titulo:"Tarea 2",
      estado:"tutorempresa"
    },
    {
      fecha:"2022-04-28",
      titulo:"Tarea 3",
      estado:""
    }
  ]
  public events!: any[]
  public options!: any
  constructor() {

  }
  ngOnInit(): void {

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlug],
      defaultDate: new Date(),
      locale: esLocale,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,timeGridDay'
      },
      editable: false
    }
    this.events=[]
    this.tareas.forEach((e)=>{
      let titulo=e.titulo
      let fecha=e.fecha
      let color = ""
      switch(e.estado){
        case "tutor":
          color="orange";
          break;
        case "tutorempresa":
          color="green";
          break;
        case "":
          color="red"
          break;
      }

      this.events.push({
        title: titulo,
        start:moment(fecha).format("YYYY-MM-DD"),
        description: "Mi primera tarea",
        color:color,
        url:"alumno/insertar/"+fecha,
      },)
      
    })
   
    
  }
}
