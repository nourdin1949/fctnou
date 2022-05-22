import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, of } from 'rxjs';
import { Centro } from 'src/app/Shared/interfaces/Interface';
import { CentrosService } from '../centros.service';

@Component({
  selector: 'app-insertar-centro',
  templateUrl: './insertar-centro.component.html',
  styleUrls: ['./insertar-centro.component.css']
})
export class InsertarCentroComponent implements OnInit {

  public forminsertarCentro: FormGroup;
  constructor(private fb: FormBuilder, private centroSerice: CentrosService) {

    this.forminsertarCentro = this.fb.group({
      nombre: ['', Validators.required],
      provincia: ['', Validators.required],
      localidad: ['', Validators.required],
      calle: ['', Validators.required],
      cp: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      telefono: ['', [Validators.required, Validators.maxLength(9)]],
      email: ['', [Validators.required]],
      cif: ['', Validators.required],
      director: ['', [Validators.required]],
      code:['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  insertarCentro(form: FormGroup) {
    const centro: Centro = {
      "codigo": this.forminsertarCentro.value.code,
      "nombreCentro": form.value.nombre,
      "provincia": form.value.provincia,
      "localidad": form.value.localidad,
      "calle": form.value.calle,
      "cp": form.value.cp,
      "cif": form.value.cif,
      "telefono": form.value.telefono,
      "email": form.value.email,
      "nombreDirector": form.value.director
    }

    if (form.valid) {
      this.centroSerice.insertarCentro(centro).subscribe((response)=>{
        (<HTMLButtonElement>document.getElementById("insertado")).click()
        setTimeout(() => {
          (<HTMLElement>document.getElementById('insertarCentro')).classList.remove('modal-open');
          (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('modal-backdrop'))[0].classList.remove('modal-backdrop')
         }, 300);
      });
    }
  }

}
