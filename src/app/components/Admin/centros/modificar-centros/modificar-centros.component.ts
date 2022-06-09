import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Centro } from 'src/app/utils/interfaces/Interface';
import { customValidatorCIFCentroBYID } from 'src/app/utils/Validators/otrasValidaciones';
import { CentrosService } from '../centros.service';
/**
 * Modificar Centros component
 */

@Component({
  selector: 'app-modificar-centros',
  templateUrl: './modificar-centros.component.html',
  styleUrls: ['./modificar-centros.component.css']
})
export class ModificarCentrosComponent {
  /**
   * Codigo centro
   */
  public codigoCentro: number = 0;
  /**
   * Centro objeto
   */
  public centro: any = {}
  /**
   * Formulario
   */
  public formModificarCentro: FormGroup
  /**
   * Constructor
   * @param activatedRoute 
   * @param fb 
   * @param router 
   * @param centroService 
   */
  public constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private centroService: CentrosService) {
    this.activatedRoute.params.subscribe(m => {
      this.codigoCentro = m['id']
      this.findCentroById()
    })

    this.formModificarCentro = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[A-Z a-z]{3,}')]],
      provincia: ['', [Validators.required, Validators.pattern('[A-Z a-z]{3,}')]],
      localidad: ['', [Validators.required, Validators.pattern('[A-Z a-z]{3,}')]],
      calle: ['', [Validators.required, Validators.pattern('[A-Z a-z]{3,}')]],
      cp: ['', [Validators.required, Validators.pattern("[0-9]{5}")]],
      telefono: ['', [Validators.required, Validators.pattern("[0-9]{9}")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      cif: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(9)],
        customValidatorCIFCentroBYID.customValidCIFCentroBYID(this.centroService, this.codigoCentro), 'blur'],
      director: ['', [Validators.required, Validators.pattern('[A-Z a-z]{3,}')]],
    })

  }
  /**
   * Metodo modificar centro
   * @param form 
   */
  public modificarCentro(form: FormGroup) {
    const centro: Centro = {
      "codigo": this.codigoCentro,
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
    console.log(centro)
    if (this.formModificarCentro.valid) {
      console.log(centro)
      this.centroService.updateCentroById(this.codigoCentro, centro)
        .subscribe((response) => {
          (<HTMLButtonElement>document.getElementById("modificado")).click()
        })
    }
  }
  /**
   * Metodo buscar centro by id
   */
  public findCentroById() {
    this.centroService.findCentroByid(this.codigoCentro)
      .subscribe((response) => {
        this.centro = response
        let centro = {
          "nombre": this.centro.nombreCentro,
          "provincia": this.centro.provincia,
          "localidad": this.centro.localidad,
          "calle": this.centro.calle,
          "cp": this.centro.cp,
          "telefono": this.centro.telefono,
          "email": this.centro.email,
          "cif": this.centro.cif,
          "director": this.centro.nombreDirector,
        }
        this.formModificarCentro.setValue(centro)
      })
  }
}