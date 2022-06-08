import { Component, OnInit } from '@angular/core';
import { User } from '../../utils/interfaces/Interface';
import { SharedService } from '../shared.service';
/**
 * The send-verifcacion Component
 */
@Component({
  selector: 'app-send-verificar-email',
  templateUrl: './send-verificar-email.component.html',
  styleUrls: ['./send-verificar-email.component.css']
})
export class SendVerificarEmailComponent {
  /**
   * Lista de usuarios
   */
  public users: User[]
  /**
   * Comprobar existencia de email
   */
  public noexiste: boolean = false
  /**
   * Verificar envio de email de verificacion
   */
  public enviadoEmail: boolean = false
  /**
   * Comprobar si ya está verificado
   */
  public verificado: boolean = false
  /**
   * Constructor
   * @param sharedservice 
   */
  public constructor(private sharedservice: SharedService) { }
  /**
   * Enviar correo de verificación
   */
  public sendverificarEmail() {
    let email = (<HTMLInputElement>document.getElementById("email")).value
    this.sharedservice.listarUsers().subscribe((response) => {
      this.users = response;
      this.users = this.users.filter((user) => user.email == email)
      if (this.users[0].email_verified_at == null) {
        this.sharedservice.sendEmailVerification(email)
          .subscribe(
            () =>
            this.enviadoEmail=true
          );
      }else {
        this.verificado=true
      }
      if (this.users.length == 0) {
        this.noexiste = true
      }
    });
  }
}
