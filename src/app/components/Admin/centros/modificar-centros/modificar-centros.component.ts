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
        nombre: ['', Validators.required],
        provincia: ['', Validators.required],
        localidad: ['', Validators.required],
        calle: ['', Validators.required],
        cp: ['', Validators.compose([Validators.required, Validators.maxLength(5), Validators.minLength(5)])],
        telefono: ['',Validators.required],
        email: ['', [Validators.required]],
        cif: ['', Validators.required],
        director: ['', [Validators.required]],
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
