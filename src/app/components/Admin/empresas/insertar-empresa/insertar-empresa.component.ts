import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insertar-empresa',
  templateUrl: './insertar-empresa.component.html',
  styleUrls: ['./insertar-empresa.component.css']
})
export class InsertarEmpresaComponent implements OnInit {
  
  public forminsertarCurso: FormGroup;
  constructor(private fb: FormBuilder) {
    this.forminsertarCurso = this.fb.group({
      empresa: ['', Validators.required],
      provincia: ['', Validators.required],
      localidad: ['', Validators.required],
      calle: ['', Validators.required],
      cp: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      representante: ['', Validators.required],
      dnirepresentante: ['', Validators.required],
      cif: ['', Validators.required]
    })
  }
  ngOnInit(): void {
  }
  insertarEmpresa(form:FormGroup){
    console.log("insertando empresa...")
  }
}
