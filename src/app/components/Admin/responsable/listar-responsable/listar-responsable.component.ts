import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Responsable } from 'src/app/utils/interfaces/Interface';
import { ResponsableService } from '../responsable.service';

@Component({
  selector: 'app-listar-responsable',
  templateUrl: './listar-responsable.component.html',
  styleUrls: ['./listar-responsable.component.css']
})
export class ListarResponsableComponent implements OnInit {
  public responsables: Responsable[] = []
  public idResponsable: number = 0
  public cargaCompleta: boolean = false

  public constructor(
    private responsbaleService: ResponsableService,
    private _snackBar: MatSnackBar) { }

  public ngOnInit(): void {
    this.listarResponsbles()
  }

  public listarResponsbles() {
    this.responsbaleService.listarResponsables()
      .subscribe(
        (response) => {
          this.responsables = response;
          this.cargaCompleta = true

        })
  }

  public guardarid(idResponsable: number) {
    this.idResponsable = idResponsable
  }

  public eliminarResponsable() {
    this.responsbaleService.eliminarResponsable(this.idResponsable)
      .subscribe(
        () => {
          this.openSnackBar()
          this.listarResponsbles()
        })
  }
  
  public openSnackBar() {
    this._snackBar.open("Eliminado con éxito", "Close",
      {
        duration: 3000
      });
  }
}
