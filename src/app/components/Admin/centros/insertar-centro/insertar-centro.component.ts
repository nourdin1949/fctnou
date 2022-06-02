import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, of } from 'rxjs';
import { Centro } from 'src/app/utils/interfaces/Interface';
import { customValidatorCIFCentro } from 'src/app/utils/Validators/otrasValidaciones';
import { CentrosService } from '../centros.service';

@Component({
  selector: 'app-insertar-centro',
  templateUrl: './insertar-centro.component.html',
  styleUrls: ['./insertar-centro.component.css']
})
export class InsertarCentroComponent implements OnInit {

  public forminsertarCentro: FormGroup;
  constructor(private fb: FormBuilder, private centroService: CentrosService) {

    this.forminsertarCentro = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[A-Z a-z]{3,}')]],
      provincia: ['', [Validators.required, Validators.pattern('[A-Z a-z]{3,}')]],
      localidad: ['', [Validators.required, Validators.pattern('[A-Z a-z]{3,}')]],
      calle: ['', [Validators.required, Validators.pattern('[A-Z a-z]{3,}')]],
      cp: ['', [Validators.required, Validators.pattern("[0-9]{5}")]],
      telefono: ['', [Validators.required, Validators.pattern("[0-9]{9}")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      cif: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(9)],
        [customValidatorCIFCentro.customValidCIFCentro(centroService)],'blur'],
      director: ['', [Validators.required,Validators.pattern('[A-Z a-z]{3,}')]],
      code: ['', [Validators.required, Validators.pattern('[0-9]{8}')]]
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
      this.centroService.insertarCentro(centro).subscribe(() => {

        (<HTMLButtonElement>document.getElementById("insertado")).click()
        setTimeout(() => {
          (<HTMLElement>document.getElementById('insertarCentro')).classList.remove('modal-open');
          (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('modal-backdrop'))[0].classList.remove('modal-backdrop')
        }, 300);
      });
    }
  }

}
