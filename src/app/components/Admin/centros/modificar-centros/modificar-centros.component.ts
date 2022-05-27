import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Centro } from 'src/app/Shared/interfaces/Interface';
import { CentrosService } from '../centros.service';

@Component({
  selector: 'app-modificar-centros',
  templateUrl: './modificar-centros.component.html',
  styleUrls: ['./modificar-centros.component.css']
})
export class ModificarCentrosComponent implements OnInit {
  public codigoCentro:number=0;
  public centro:any={}
  public formModificarCentro:FormGroup

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
        cif: ['', Validators.required],
        director: ['', [Validators.required,Validators.pattern('[A-Z a-z]{3,}')]],
      })

  }
  public ngOnInit(): void {
    
  }
 

  modificarCentro(form: FormGroup) {
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
    if(this.formModificarCentro.valid ){
      console.log(centro)
      this.centroService.updateCentroById(this.codigoCentro,centro)
      .subscribe((response) => {
        (<HTMLButtonElement>document.getElementById("modificado")).click()
      })
    }
  }

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
