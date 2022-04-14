import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.css']
})
export class AsignarComponent implements OnInit {
  public formAsignar: FormGroup;
  constructor(private fb: FormBuilder) {
      this.formAsignar= this.fb.group({
        alumno:['', Validators.required],
        empresa:['', Validators.required],
        centro:['', Validators.required],
        responsable:['', Validators.required],
        curso:['', Validators.required]
     
      })
   }

  ngOnInit(): void {
  }

}
