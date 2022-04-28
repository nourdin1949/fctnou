import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insertar-responsable',
  templateUrl: './insertar-responsable.component.html',
  styleUrls: ['./insertar-responsable.component.css']
})
export class InsertarResponsableComponent implements OnInit {
  public empresas: string[] = ["NTTDATA", "EVERIS", "VIEWNEXT", "FCTR"]
  public forminsertarResponsable: FormGroup;
  constructor(private fb: FormBuilder) {
    

    this.forminsertarResponsable = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      empresa: ['', Validators.required],
    })
  }
  ngOnInit(): void {
  }
  insertarResponsable(form:FormGroup){
    console.log("insertando empresa...")
  }
}
