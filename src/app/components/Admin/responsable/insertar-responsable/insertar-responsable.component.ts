import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empresa, Responsable } from 'src/app/utils/interfaces/Interface';
import { SharedService } from 'src/app/Shared/shared.service';
import { customValidatordDni, customValidatorEmail, customValidatorFormatDNI } from 'src/app/utils/Validators/otrasValidaciones';
import { EmpresasService } from '../../empresas/empresas.service';
import { ResponsableService } from '../responsable.service';
/**
 * The insertar responsable component
 */
@Component({
  selector: 'app-insertar-responsable',
  templateUrl: './insertar-responsable.component.html',
  styleUrls: ['./insertar-responsable.component.css']
})
export class InsertarResponsableComponent implements OnInit {
  /**
   * matriz de empresas
   */
  public empresas: Empresa[] = []
  /**
   * Formulario
   */
  public forminsertarResponsable: FormGroup;
  /**
   * Constructor
   * @param fb 
   * @param responsableService 
   * @param empresaService 
   * @param sharedService 
   */
  constructor(
    private fb: FormBuilder,
    private responsableService: ResponsableService,
    private empresaService: EmpresasService,
    private sharedService: SharedService) {

    this.forminsertarResponsable = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern("[A-Z a-z]{3,}")]],
      dni: ['', [Validators.required, Validators.pattern("[0-9]{8}[A-Z]{1}")],
        [customValidatordDni.customValidDni(sharedService,),
        customValidatorFormatDNI.customValidDNILETRA], 'blur'],
      empresa: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
        [customValidatorEmail.customValidEmail(sharedService)], 'blur'],
    })
  }
  /**
   * NgOnInit
   */
  public ngOnInit(): void {
    this.listarEmpresas()
  }
  /**
   * Metodo insertar responsable
   * @param form 
   */
  public insertarResponsable(form: FormGroup) {
    const responsable: Responsable = {
      "id": 0,
      "nombreResponsable": form.value.nombre,
      "dniResponsable": form.value.dni,
      "email": form.value.email,
      "empresa_id": form.value.empresa
    }
    if (this.forminsertarResponsable.valid) {
      this.responsableService.insertarResponsables(responsable)
        .subscribe((response) => {
          (<HTMLButtonElement>document.getElementById("insertado")).click()
          setTimeout(() => {
            (<HTMLElement>document.getElementById('insertarResponsable')).classList.remove('modal-open');
            (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('modal-backdrop'))[0].classList.remove('modal-backdrop')
          }, 300);
        })
    }
  }
  /**
   * Metodo listar empresa
   */
  public listarEmpresas() {
    this.empresaService.listarEmpresas().subscribe((response) => {
      this.empresas = response;
    })
  }
}
