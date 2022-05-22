import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Centro, Profesor } from 'src/app/Shared/interfaces/Interface';
import { CentrosService } from '../../centros/centros.service';
import { ProfesorService } from '../profesor.service';

@Component({
  selector: 'app-insertar-profesor',
  templateUrl: './insertar-profesor.component.html',
  styleUrls: ['./insertar-profesor.component.css']
})
export class InsertarProfesorComponent implements OnInit {
  public centros: Centro[]=[]
  public forminsertarProfesor: FormGroup;
  constructor(private fb: FormBuilder, private profesorService: ProfesorService, private centroService:CentrosService) {

    this.forminsertarProfesor = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      centro: ['0', Validators.required],
      email: ['', [Validators.compose([Validators.required, Validators.email])]]
    })
  }
  ngOnInit(): void {
    this.listarCentros()
  }
  insertarProfesor(form: FormGroup) {
    const profesor: Profesor = {
      "id":0,
      "nombreTutor": this.forminsertarProfesor.value.nombre, 
      "dniTutor": this.forminsertarProfesor.value.dni, 
      "email":this.forminsertarProfesor.value.email, 
      "codigoCentro": this.forminsertarProfesor.value.centro
    }
    if (this.forminsertarProfesor.valid) {
      this.profesorService.insertarProfesor(profesor).subscribe(
       (response)=>{
        (<HTMLButtonElement>document.getElementById("insertado")).click()
        setTimeout(() => {
          (<HTMLElement>document.getElementById('insertarTutor')).classList.remove('modal-open');
          (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('modal-backdrop'))[0].classList.remove('modal-backdrop')
         }, 300);
        this.profesorService.listarProfesor();
       }
      );
    }
  }
  listarCentros(){
    this.centroService.listarCentros().subscribe((response)=>{
      this.centros= response
    })
  }
} 
