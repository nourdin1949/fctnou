import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ValidarFileIMGPerfil } from 'src/app/utils/Validators/ValidacionesFicheross';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public formperfil!: FormGroup;
  public fileImg

  constructor(
    private fb: FormBuilder,
    private shareserv: SharedService,
    private _snackBar: MatSnackBar) {
    this.formperfil = this.fb.group({
      image: [""]
    })
  }

  public ngOnInit(): void {
  }
  public uploadFile(event: Event) {
    this.fileImg = (event.target as HTMLInputElement)?.files?.[0]
  }

  public submitform() {
    const formData: any = new FormData()
    formData.append("image", this.fileImg)
    console.log( this.fileImg)
    console.log(formData)
    if (this.formperfil.valid) {
      this.shareserv.subirImagen(formData)
        .subscribe(
          (res) => {
            this.openSnackBar()
            console.log(res)
            //setTimeout(()=>window.location.reload(),2000)
          })
    }
  }
  public openSnackBar() {
    this._snackBar.open("Foto de Perfil Cambiada ", "Close",
      {
        duration: 3000,
      });
  }
}
