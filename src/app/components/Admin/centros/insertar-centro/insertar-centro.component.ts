import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { from, of } from 'rxjs';

@Component({
  selector: 'app-insertar-centro',
  templateUrl: './insertar-centro.component.html',
  styleUrls: ['./insertar-centro.component.css']
})
export class InsertarCentroComponent implements OnInit {

  public forminsertarCentro: FormGroup;
  constructor(private fb : FormBuilder) {
    this.forminsertarCentro= this.fb.group({
      nombre: ['', Validators.required],
      provincia: ['', Validators.required],
      localidad: ['', Validators.required],
      calle: ['', Validators.required],
      cp: ['',  [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      telefono: ['', [Validators.required, Validators.maxLength(9)]],
      email: ['', [Validators.required]],
      cif: ['', Validators.required],
      director:['aaa', [Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  insertarCentro(form: FormGroup){
    if(form.invalid){
      
      document.getElementById("email")?.classList.add("is-invalid")
      console.log("invalido")
    }else if(form.valid)
      console.log("insertando centro")
  }

}
