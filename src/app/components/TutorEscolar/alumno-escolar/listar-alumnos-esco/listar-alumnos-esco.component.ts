import { Component, OnInit } from '@angular/core';
import { TutorEscolarService } from '../../tutor-escolar.service';

@Component({
  selector: 'app-listar-alumnos-esco',
  templateUrl: './listar-alumnos-esco.component.html',
  styleUrls: ['./listar-alumnos-esco.component.css']
})
export class ListarAlumnosEscoComponent implements OnInit {
  public alumnos:any[]=[]
  constructor(
    private tutorEscolarService:TutorEscolarService,) { 
      
    }

  ngOnInit(): void {
    setTimeout(() => {
      this.alumnos= this.tutorEscolarService.alumnos
      console.log("ess")
    },700);
  }
}
