import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/Shared/interfaces/Interface';
import { EmpresasService } from '../empresas.service';
import { ListarEmpresasComponent } from '../listar-empresas/listar-empresas.component';


@Component({
  selector: 'app-modificar-empresas',
  templateUrl: './modificar-empresas.component.html',
  styleUrls: ['./modificar-empresas.component.css']
})
export class ModificarEmpresasComponent implements  OnInit{

  public idEmpresa:number=0;
  public empresa:any={}
  public clicked:string=""
  public formModificarEmpresa:FormGroup

  public constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, 
    private router: Router, 
    private empresaService: EmpresasService) {
      this.activatedRoute.params.subscribe(m => {
        this.idEmpresa = m['id']
        this.findEmpresaById()
      })
   

    this.formModificarEmpresa = this.fb.group({
      empresa: ['', Validators.required],
      provincia: ['', Validators.required],
      localidad: ['', Validators.required],
      calle: ['', Validators.required],
      cp: ['', [Validators.required,  Validators.pattern("[0-9]{5}")]],
      telefono: ['', [Validators.required, Validators.pattern("[A-Z]{0}[0-9]{9}")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      representante: ['', Validators.required],
      dnirepresentante: ['',[ Validators.required, Validators.pattern("[0-9]{8}[A-Z]{1}")]],
    })

  }
  public ngOnInit(): void {
    
  }
 

  modificarEmpresa(form: FormGroup) {
    const empresa: Empresa = {
      "id":this.idEmpresa,
      "nombreEmpresa": form.value.empresa,
      "provincia": form.value.provincia,
      "localidad": form.value.localidad,
      "calle":  form.value.calle,
      "cp":  form.value.cp,
      "cif": "",
      "telefono":  form.value.telefono,
      "email":  form.value.email,
      "nombreRepresentante":  form.value.representante,
      "dniRepresentante":  form.value.dnirepresentante
    }
    if(this.formModificarEmpresa.valid ){
      this.empresaService.updateEmpresaById(this.idEmpresa,empresa)
      .subscribe((response) => {
        (<HTMLButtonElement>document.getElementById("modificado")).click()
        this.clicked="clicked"
      })
    }
  }

  public findEmpresaById() {
    this.empresaService.findEmpresaByid(this.idEmpresa)
      .subscribe((response) => {
        this.empresa = response
        let empresa = {
          "empresa": this.empresa.nombreEmpresa,
          "provincia": this.empresa.provincia,
          "localidad": this.empresa.localidad,
          "calle": this.empresa.calle,
          "cp": this.empresa.cp,
          "telefono": this.empresa.telefono,
          "email": this.empresa.email,
          "representante": this.empresa.nombreRepresentante,
          "dnirepresentante": this.empresa.dniRepresentante,
        }
        console.log(empresa)
        this.formModificarEmpresa.setValue(empresa)
      })
  }

}
