import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-insertar-profesor',
  templateUrl: './insertar-profesor.component.html',
  styleUrls: ['./insertar-profesor.component.css']
})
export class InsertarProfesorComponent implements OnInit {
  public centros: string[] = ["IES AUGUSTOBRIGA", "IES Zurbaran", "Universidad Caceres"]
  public forminsertarProfesor: FormGroup;
  constructor(private fb: FormBuilder) {
    

    this.forminsertarProfesor = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      centro: ['', Validators.required],
    })
  }
  ngOnInit(): void {
  }
  insertarProfesor(form:FormGroup){
    console.log("insertando empresa...")
  }

}
