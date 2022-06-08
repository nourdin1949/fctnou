import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ValidarFileIMGPerfil } from 'src/app/utils/Validators/ValidacionesFicheross';
import { SharedService } from '../shared.service';
/**
 * The Perfil component
 */
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  /**
   * Formulario
   */
  public formperfil!: FormGroup;
  /**
   * Imagen
   */
  public fileImg
  /**
   * Constructor
   * @param fb 
   * @param shareserv 
   * @param _snackBar 
   */
  constructor(
    private fb: FormBuilder,
    private shareserv: SharedService,
    private _snackBar: MatSnackBar) {
    this.formperfil = this.fb.group({
      image: ["", Validators.required, ValidarFileIMGPerfil.filevalidator]
    })
  }
  /**
   * Metodo guardar imagen en variable 
   * @param event 
   */
  public uploadFile(event: Event) {
    this.fileImg = (event.target as HTMLInputElement)?.files?.[0]
  }
  /**
   * Método subir imagen al servidor
   */
  public submitform() {
    const formData: any = new FormData()
    formData.append("image", this.fileImg)
    if (this.formperfil.valid) {
      this.shareserv.subirImagen(formData)
        .subscribe(
          () => {
            this.openSnackBar()
          })
    }else{
      this.openSnackBarNoexiste()
    }
  }
  /**
   * Metodo notifica con un snackbar
   */
  public openSnackBar() {
    this._snackBar.open("Foto de Perfil Cambiada ", "Close",
      {
        duration: 3000,
      });
  }
  /**
   * Metodo notifica con un snackbar
   */
  public openSnackBarNoexiste() {
    this._snackBar.open("Selecciona una foto ", "Close",
      {
        duration: 3000,
      });
  }

  /**
   * Metodo eliminar foto
   */
  public eliminarFoto(){
    this.shareserv.eliminarFoto().subscribe(()=> this.openSnackBarEliminar())
  }
  /**
   * Metodo notifica con un snackbar
   */
   public openSnackBarEliminar() {
    this._snackBar.open("Foto de Perfil Eliminada", "Close",
      {
        duration: 3000,
      });
  }

}
