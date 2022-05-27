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
      cp: ['', [Validators.required,  Validators.pattern("[0-9]{5}")]],
      telefono: ['', [Validators.required, Validators.pattern("[A-Z]{0}[0-9]{9}")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      representante: ['', Validators.required],
      dnirepresentante: ['',[ Validators.required, Validators.pattern("[0-9]{8}[A-Z]{1}")]],
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
        setTimeout(() => {
          (<HTMLElement>document.getElementById('insertarEmpresa')).classList.remove('modal-open');
          (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('modal-backdrop'))[0].classList.remove('modal-backdrop')
         }, 300);
        this.empresaService.listarEmpresas()
      })
    }
  }
}
