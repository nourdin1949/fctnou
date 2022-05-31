import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/Interface';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-send-verificar-email',
  templateUrl: './send-verificar-email.component.html',
  styleUrls: ['./send-verificar-email.component.css']
})
export class SendVerificarEmailComponent implements OnInit {

  public users: User[]
  public noexiste: boolean = false
  public enviadoEmail: boolean = false
  public verificado: boolean = false
  public constructor(private sharedservice: SharedService) { }

  public ngOnInit(): void {
  }
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
