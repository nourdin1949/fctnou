import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public perfil! : string
  constructor(private shareServ: SharedService) {
   }

  ngOnInit(): void {
    this.perfil = this.shareServ.perfil
    console.log(this.perfil)
    this.perfil=localStorage.getItem("Perfil")!;
   
  }

}
