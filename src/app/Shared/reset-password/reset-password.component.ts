import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public formResetpassword: FormGroup
  public mostrarMensaje: boolean = false
  public token!:string;
  constructor(private fb: FormBuilder,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private sharedserv: SharedService) {

      this.activedRoute.params.subscribe((response) => {
        this.token=response['token']
    
      })
    this.formResetpassword = this.fb.group({
     
      email: ['', Validators.required],
      pwd: ['', Validators.required],
      pwd1: ['', Validators.required]
    })
  }
  ngOnInit(): void {
  }
  recuperarContrasenia() {
  
    if(this.formResetpassword.valid){
      const objetoDatos:object = {
        "token":this.token,
        "email":this.formResetpassword.value.email,
        "password":this.formResetpassword.value.pwd,
        "password_confirmation":this.formResetpassword.value.pwd1
      }
      
      this.sharedserv.resetpassword(objetoDatos).subscribe((response)=>{
        console.log(response)
        this.router.navigateByUrl("")
      })
    }
    console.log(this.formResetpassword.value)
  }
} 
