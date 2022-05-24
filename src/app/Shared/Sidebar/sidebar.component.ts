import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import * as moment from "moment"
import { User } from '../interfaces/Interface';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public user:User={"id":0, "username":"", "email":"", "perfil":"","activo":0, "email_verified_at":""}
  public date = moment(moment.now()).format("YYYY-MM-DD")
  public username:string=""
  constructor(private shareServ: SharedService) {
    this.shareServ.getUser().subscribe((response)=>{
      this.user=response
      console.log(this.user.perfil)
    })
    
    
  }

  ngOnInit(): void {
   
  }

  logout(){
    this.shareServ.logout().subscribe()
      localStorage.removeItem('token')
      sessionStorage.removeItem(`id`)
  }

}
