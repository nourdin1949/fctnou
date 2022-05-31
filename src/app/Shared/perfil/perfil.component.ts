import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public formperfil!:FormGroup;
  public fileImg

  constructor(
    private fb:FormBuilder, 
    private shareserv:SharedService,
    private _snackBar:MatSnackBar) { 
    this.formperfil= this.fb.group({
      image :[""]
    })
  }

  public ngOnInit(): void {
  }
  public uploadFile(event:Event){
   this.fileImg= (event.target as HTMLInputElement)?.files?.[0]
  }

  public submitform(){
    const formData:any  = new FormData()
    formData.append("image", this.fileImg)
    this.shareserv.subirImagen(formData)
      .subscribe(
        ()=>{
          this.openSnackBar()
          window.location.reload()
        })
  }
  public openSnackBar() {
    this._snackBar.open("Foto de Perfil Cambiada ", "Close",
      {
        duration: 3000,
      });
  }
}
