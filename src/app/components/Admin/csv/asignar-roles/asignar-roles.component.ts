import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-asignar-roles',
  templateUrl: './asignar-roles.component.html',
  styleUrls: ['./asignar-roles.component.css']
})
export class AsignarRolesComponent implements OnInit {

  public formRoles: FormGroup

  constructor(private fb: FormBuilder) {
    this.formRoles = this.fb.group({
      dni:['', Validators.required],
      rol:['', Validators.required],
      pwd:['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

}
