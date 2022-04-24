import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styleUrls: ['./validar.component.css']
})
export class ValidarComponent implements OnInit {
  public tareas: any[] = []
  public alumnoAbuscar: string = ""
  public fechaDesde: Date = new Date()
  public fechaHasta: Date = new Date()
  constructor() { }

  ngOnInit(): void {
  }
  mostrarTareasDelAlumno() {
    window.alert("Mostrar Tareas del alumno " + this.fechaDesde)
    this.tareas = [{
      id: "1",
      descripcion: "Formacion NOVA",
      orientacion: "Documentacoion en everFuture",
      tiempo: "07:45",
      dificultad: "facil",
      observaciones: "el Everfuture va lento",
      tutorempresa: true
    },
    {
      id: "2",
      descripcion: "Formacion NOVA",
      orientacion: "Documentacoion en everFuture",
      tiempo: "06:40",
      dificultad: "dificil",
      observaciones: "el Everfuture va lento",
      tutorempresa: false
    }, {
      id: "3",
      descripcion: "Formacion NOVA",
      orientacion: "Documentacoion en everFuture",
      tiempo: "08:00",
      dificultad: "medio",
      observaciones: "el Everfuture va lento",
      tutorempresa: true
    }]

  }
}
