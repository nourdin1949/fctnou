import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insertar-datos',
  templateUrl: './insertar-datos.component.html',
  styleUrls: ['./insertar-datos.component.css']
})
export class InsertarDatosComponent implements OnInit {

  public formcsv: FormGroup

  constructor(private fb : FormBuilder) {
    this.formcsv = this.fb.group({
      empresas:['', Validators.required],
      centros:['', Validators.required],
      cursos:['', Validators.required],
      alumnos:['', Validators.required],
      resp:['', Validators.required],
      tutores:['', Validators.required],
     
    })
   }

  ngOnInit(): void {
  }

}
