import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {  Empresa, Responsable } from 'src/app/Shared/interfaces/Interface';
import { EmpresasService } from '../../empresas/empresas.service';
import { ResponsableService } from '../responsable.service';

@Component({
  selector: 'app-modificar-responsable',
  templateUrl: './modificar-responsable.component.html',
  styleUrls: ['./modificar-responsable.component.css']
})
export class ModificarResponsableComponent implements OnInit {

  public empresas: Empresa[]=[]
  public idResponsable:number=0;
  public responsable:any={}
  public formModificarResponsable:FormGroup

  public constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, 
    private responsableService: ResponsableService,
    private empresasService:EmpresasService) {
      this.activatedRoute.params.subscribe(m => {
        this.idResponsable = m['id']
        this.findResponsbaleById()
      })
   

      this.formModificarResponsable = this.fb.group({
        nombre: ['', Validators.required],
        dni: ['', Validators.required],
        empresa: ['0', Validators.required],
        email: ['', [Validators.compose([Validators.required, Validators.email])]]
      })

  }
  public ngOnInit(): void {
      this.listarEmpresas();
  }
 

  public modificarResponsable(form: FormGroup) {
    const responsable: Responsable = {
      "id":0,
      "nombreResponsable":form.value.nombre, 
      "dniResponsable": form.value.dni, 
      "email": form.value.email, 
      "empresa_id": form.value.empresa
    }
    if(this.formModificarResponsable.valid ){
      this.responsableService.updateResponsableById(this.idResponsable,responsable)
      .subscribe((response) => {
        (<HTMLButtonElement>document.getElementById("modificado")).click()
      })
    }
  }

  private findResponsbaleById() {
    this.responsableService.findResponsableByid(this.idResponsable)
      .subscribe((response) => {
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
      })
  }

  private listarEmpresas(){
    this.empresasService.listarEmpresas().subscribe((response)=>{
      this.empresas= response
    })
  }
}
