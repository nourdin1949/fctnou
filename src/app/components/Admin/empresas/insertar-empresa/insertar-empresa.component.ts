import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empresa } from 'src/app/Shared/interfaces/Interface';
import { EmpresasService } from '../empresas.service';
import { ListarEmpresasComponent } from '../listar-empresas/listar-empresas.component';
@Component({
  selector: 'app-insertar-empresa',
  templateUrl: './insertar-empresa.component.html',
  styleUrls: ['./insertar-empresa.component.css']
})
export class InsertarEmpresaComponent implements OnInit {

  public forminsertarEmpresa: FormGroup;

  constructor(private fb: FormBuilder,
    private empresaService: EmpresasService) {
    this.forminsertarEmpresa = this.fb.group({
      empresa: ['', Validators.required],
      provincia: ['', Validators.required],
      localidad: ['', Validators.required],
      calle: ['', Validators.required],
      cp: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      representante: ['', Validators.required],
      dnirepresentante: ['', Validators.required],
      cif: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  insertarEmpresa(form: FormGroup) {
    const empresa: Empresa = {
      "id": 0,
      "nombreEmpresa": form.value.empresa,
      "provincia": form.value.provincia,
      "localidad": form.value.localidad,
      "calle": form.value.calle,
      "cp": form.value.cp,
      "cif": form.value.cif,
      "telefono": form.value.telefono,
      "email": form.value.email,
      "nombreRepresentante": form.value.representante,
      "dniRepresentante": form.value.dnirepresentante
    }
    if (this.forminsertarEmpresa.valid) {
      this.empresaService.insertarEmpresas(empresa).subscribe((response) => {
        console.log(response);
        (<HTMLButtonElement>document.getElementById("insertado")).click()
        this.empresaService.listarEmpresas()
      })
    }
  }
}
