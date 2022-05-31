import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Centro, Profesor } from 'src/app/Shared/interfaces/Interface';
import { SharedService } from 'src/app/Shared/shared.service';
import { customValidatordDniBYID, customValidatorEmailBYID, customValidatorFormatDNI } from 'src/app/utils/otrasValidaciones';
import { CentrosService } from '../../centros/centros.service';
import { ProfesorService } from '../profesor.service';

@Component({
  selector: 'app-modificar-profesor',
  templateUrl: './modificar-profesor.component.html',
  styleUrls: ['./modificar-profesor.component.css']
})
export class ModificarProfesorComponent implements OnInit {
  public centros: Centro[] = []
  public idTutor: number = 0;
  public tutor: any = {}
  public formModificarTutor: FormGroup

  public constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private tutorService: ProfesorService,
    private centroService: CentrosService,
    private sharedService:SharedService) {
    this.activatedRoute.params.subscribe(m => {
      this.idTutor = m['id']
      this.findTutorById()
    })


    this.formModificarTutor = this.fb.group({
      nombre: ['', [Validators.required,Validators.pattern("[A-Z a-z]{3,}")]],
      dni: ['', [Validators.required, Validators.pattern("[0-9]{8}[A-Z]{1}")],
      [customValidatordDniBYID.customValidDni(sharedService, this.idTutor),
        customValidatorFormatDNI.customValidDNILETRA], 'blur' ],
      centro: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      [customValidatorEmailBYID.customValidEmail(sharedService, this.idTutor)], 'blur' ]
    })

  }
  public ngOnInit(): void {
    this.listarCentros();
  }


  public modificarProfesor(form: FormGroup) {
    const profesor: Profesor = {
      "id": this.idTutor,
      "nombreTutor": this.formModificarTutor.value.nombre,
      "dniTutor": this.formModificarTutor.value.dni,
      "email": this.formModificarTutor.value.email,
      "codigoCentro": this.formModificarTutor.value.centro
    }
    if (this.formModificarTutor.valid) {
      this.tutorService.updateTutorById(this.idTutor, profesor)
        .subscribe(() => {
          (<HTMLButtonElement>document.getElementById("modificado")).click()
        })
    }
  }

  private findTutorById() {
    this.tutorService.findTutorByid(this.idTutor)
      .subscribe((response) => {
        this.tutor = response
        console.log(this.tutor)
        let tutor = {
          "nombre": this.tutor.nombreTutor,
          "dni": this.tutor.dniTutor,
          "centro": this.tutor.codigoCentro,
          "email": this.tutor.email,
        }
        console.log(tutor)
        this.formModificarTutor.setValue(tutor)
      })
  }

  private listarCentros() {
    this.centroService.listarCentros().subscribe((response) => {
      this.centros = response
    })
  }

}
