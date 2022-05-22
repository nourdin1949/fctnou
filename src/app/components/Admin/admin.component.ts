import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public fechaInicio: Date = new Date()
  public fechaFin: Date = new Date()
  constructor(private router:Router) {
    this.fechaFin.setTime(this.fechaFin.getTime() + 3600000)
    // setInterval((e) => {

    //   this.fechaInicio.setTime(this.fechaInicio.getTime() + 1000)
    //   console.log(this.fechaFin.getTime())
    //   if (this.fechaFin.getTime() < this.fechaInicio.getTime()) {
    //     localStorage.removeItem("token")
    //     this.router.navigateByUrl("")
    //   }
    // }, 1000)
  }

  ngOnInit(): void {
  }

}
