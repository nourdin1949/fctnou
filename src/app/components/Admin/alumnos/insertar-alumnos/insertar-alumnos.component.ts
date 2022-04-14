import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insertar-alumnos',
  templateUrl: './insertar-alumnos.component.html',
  styleUrls: ['./insertar-alumnos.component.css']
})
export class InsertarAlumnosComponent implements OnInit {

  public forminsertarAlumno:FormGroup;
  constructor(private fb : FormBuilder) { 
    this.forminsertarAlumno = this.fb.group({
      nombre: ['', Validators.required],
      apellidos:['',Validators.required],
      dni:['',Validators.required],
      provincia: ['', Validators.required],
      localidad: ['', Validators.required],
      calle: ['', Validators.required],
      cp: ['',  [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      telefono: ['', [Validators.required, Validators.maxLength(9)]],
      curso: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  insertarAlumo(form:FormGroup){

  }

}
