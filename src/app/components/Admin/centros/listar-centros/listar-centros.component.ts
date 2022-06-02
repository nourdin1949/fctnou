import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Centro } from 'src/app/utils/interfaces/Interface';
import { CentrosService } from '../centros.service';


@Component({
  selector: 'app-listar-centros',
  templateUrl: './listar-centros.component.html',
  styleUrls: ['./listar-centros.component.css']
})
export class ListarCentrosComponent implements OnInit {
  public centros: Centro[] = []
  public codigoCentro: number = 0
  public cargaCompleta: boolean = false

  constructor(private centroService: CentrosService, private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.listarCentros();
  }
  listarCentros() {
    this.centroService.listarCentros().subscribe((response) => {
      this.centros = response;
      this.cargaCompleta = true
    })
  }
  guardarcodigo(codigo: number) {
    this.codigoCentro = codigo;
  }

  public eliminarCentro() {
    this.centroService.eliminarCentro(this.codigoCentro)
      .subscribe(
        () => {
          this.openSnackBar()
          this.listarCentros()
        })
  }
  public openSnackBar() {
    this._snackBar.open("Eliminado con éxito", "Close",
      {
        duration: 3000
      });
  }
}
