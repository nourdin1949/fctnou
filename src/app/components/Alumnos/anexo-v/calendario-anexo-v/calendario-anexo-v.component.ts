import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlug from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import * as moment from 'moment';
import { Tarea } from 'src/app/utils/interfaces/Interface';
import { environment } from 'src/environments/environment';
import { AnexoVService } from '../anexo-v.service';
/**
 * The calendario anexo v component 
 */
@Component({
  selector: 'app-calendario-anexo-v',
  templateUrl: './calendario-anexo-v.component.html',
  styleUrls: ['./calendario-anexo-v.component.css']
})
export class CalendarioAnexoVComponent implements OnInit {
  /**
   * Matriz tareas
   */
  public tareas:Tarea[]=[]
  /**
   * Matrix eventos
   */
  public events!: any[]
  /**
   *  opciones
   */
  public options!: any
  /**
   * Calendario
   */
  public urlEventos = environment.rutaEventos
  /**
   * id alumno
   */
  public idAlumno = sessionStorage.getItem('id')
  /**
   * Constructor
   * @param router 
   * @param anexoVService 
   */
  constructor(private router:Router, private anexoVService:AnexoVService) {}
  /**
   * NgOnint
   */
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
    this.listartareasAlumnos()
   }, 600);
    
  }
  /**
   * Metodo listar alumnos
   */
  public listartareasAlumnos(){
    this.anexoVService.listartareasAlumnos().subscribe((response)=>{
      this.tareas= response;
      this.cargarCalendario()
    })
  }
  /**
   * Metodo cargar calendario
   */
  public cargarCalendario(){
    
    this.events=[]
    this.tareas.forEach((e)=>{
      let titulo=e.descripcion.slice(0,20)
      let fecha=e.fecha
      let color = ""
      let estado = e.validadoResponsable+String(e.validadoTutor)
      let url =`${this.urlEventos}${fecha}/${e.id}`
      
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
      if(color=="green"){
        url=""
      }
      this.events.push({
        title: titulo,
        url:url,
        start:moment(fecha).format("YYYY-MM-DD"),
        description: e.descripcion,
        color:color,
        icon:'fa-save'
      })
      
    })
  }
}
