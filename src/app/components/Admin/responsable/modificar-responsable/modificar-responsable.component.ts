import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Empresa, Responsable } from 'src/app/utils/interfaces/Interface';
import { SharedService } from 'src/app/Shared/shared.service';
import { customValidatordDniBYID, customValidatorEmailBYID, customValidatorFormatDNI } from 'src/app/utils/Validators/otrasValidaciones';
import { EmpresasService } from '../../empresas/empresas.service';
import { ResponsableService } from '../responsable.service';
/**
 * The modificar responsable component
 */
@Component({
  selector: 'app-modificar-responsable',
  templateUrl: './modificar-responsable.component.html',
  styleUrls: ['./modificar-responsable.component.css']
})
export class ModificarResponsableComponent implements OnInit {
  /**
   * Matriz empresas
   */
  public empresas: Empresa[] = []
  /**
   * Id Responsable
   */
  public idResponsable: number = 0;
  /**
   * Objet responsable
   */
  public responsable: any = {}
  /**
   * Formulario
   */
  public formModificarResponsable: FormGroup
  /**
   * Constructor
   * @param activatedRoute 
   * @param fb 
   * @param responsableService 
   * @param empresasService 
   * @param sharedService 
   */
  public constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private responsableService: ResponsableService,
    private empresasService: EmpresasService,
    private sharedService: SharedService) {
    this.activatedRoute.params.subscribe(m => {
      this.idResponsable = m['id']
      this.findResponsbaleById()
    })

    this.formModificarResponsable = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern("[A-Z a-z]{3,}")]],
      dni: ['', [Validators.required, Validators.pattern("[0-9]{8}[A-Z]{1}")],
        [customValidatordDniBYID.customValidDni(sharedService, this.idResponsable),
          customValidatorFormatDNI.customValidDNILETRA], 'blur'],
      empresa: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
        [customValidatorEmailBYID.customValidEmail(sharedService, this.idResponsable)], 'blur'],
    })
  }
  /**
   * NgOnInit
   */
  public ngOnInit(): void {
    this.listarEmpresas();
  }
  /**
   * Modificar Responsable
   * @param form 
   */
  public modificarResponsable(form: FormGroup) {
    const responsable: Responsable = {
      "id": 0,
      "nombreResponsable": form.value.nombre,
      "dniResponsable": form.value.dni,
      "email": form.value.email,
      "empresa_id": form.value.empresa
    }
    if (this.formModificarResponsable.valid) {
      this.responsableService.updateResponsableById(this.idResponsable, responsable)
        .subscribe(
          () => {
            (<HTMLButtonElement>document.getElementById("modificado")).click()
          })
    }
  }
  /**
   * metodo buscar responsable by id
   */
  private findResponsbaleById() {
    this.responsableService.findResponsableByid(this.idResponsable)
      .subscribe(
        (response) => {
          this.responsable = response
          console.log(this.responsable)
          let tutor = {
            "nombre": this.responsable.nombreResponsable,
            "dni": this.responsable.dniResponsable,
            "empresa": this.responsable.empresa_id,
            "email": this.responsable.email,
          }
          console.log(tutor)
          this.formModificarResponsable.setValue(tutor)
        });
  }
  /**
   * Metodo listar empresas
   */
  private listarEmpresas() {
    this.empresasService.listarEmpresas()
      .subscribe(
        (response) => {
          this.empresas = response
        })
  }
}
