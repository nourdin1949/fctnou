import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/Interface';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrls: ['./verificar-email.component.css']
})
export class VerificarEmailComponent implements OnInit {
  public users: User[]
  public
  constructor(private sharedservice: SharedService) { }

  ngOnInit(): void {
  }
  verificarEmail() {
    let email = (<HTMLInputElement>document.getElementById("email")).value
    this.sharedservice.listarUsers().subscribe((response) => {
      this.users = response;
      this.users = this.users.filter((user) => user.email == email)
      if (this.users[0].email_verified_at==null) {
        
      } 
    });
  }
}
