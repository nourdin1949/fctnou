import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { User } from '../../utils/interfaces/Interface';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrls: ['./verificar-email.component.css']
})
export class VerificarEmailComponent implements OnInit {
  public users: User[]
  public formVerificacion: FormGroup
  public incorrecto: boolean = false;
  public verificado: boolean = false;
  public debounce: Subject<string> = new Subject<string>()
  constructor(private sharedservice: SharedService, private fb: FormBuilder, private router: Router) {
    this.formVerificacion = this.fb.group({
      usuario: ['', Validators.required],
      pwd: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.debounce.pipe(
      debounceTime(3000)
    ).subscribe(
      resp => this.router.navigateByUrl('')
    )
  }
  verificarEmail() {
    const obejto = {
      "email": this.formVerificacion.value.email,
      "username": this.formVerificacion.value.usuario,
      "password": this.formVerificacion.value.pwd,
    }
    this.sharedservice.verificarEmail(obejto).subscribe(
      () => {
        this.verificado = true
        this.debounce.next("siguiente")
      },
      () => {
        this.incorrecto = true
      }
    )

  }
}
