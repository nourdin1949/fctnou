import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insertar-curso',
  templateUrl: './insertar-curso.component.html',
  styleUrls: ['./insertar-curso.component.css']
})
export class InsertarCursoComponent implements OnInit {

  public forminsertarCurso: FormGroup;
  constructor(private fb: FormBuilder) {
    this.forminsertarCurso = this.fb.group({
      code:['', Validators.required],
      familia:['', Validators.required],
      ciclo:['', Validators.required],
      curso:['', Validators.required],
      horas:['', Validators.required],
      tutor:['', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  insertarCurso(form:FormGroup){
    console.log("insertar")
    console.log(form)
  }
}
