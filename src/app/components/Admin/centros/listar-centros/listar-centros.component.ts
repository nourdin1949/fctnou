import { Component, OnInit } from '@angular/core';
import { Centro } from 'src/app/Shared/interfaces/Interface';
import { CentrosService } from '../centros.service';


@Component({
  selector: 'app-listar-centros',
  templateUrl: './listar-centros.component.html',
  styleUrls: ['./listar-centros.component.css']
})
export class ListarCentrosComponent implements OnInit {
  public centros: Centro[] = []
  public codigoCentro: number=0
  constructor(private centroService: CentrosService) { }

  ngOnInit(): void {
    this.listarCentros();
  }
  listarCentros() {
    this.centroService.listarCentros().subscribe((response) => {
      this.centros = response;
    })
  }
  guardarcodigo(codigo:number){
    this.codigoCentro=codigo;
  }

  eliminarCentro(){
    this.centroService.eliminarCentro(this.codigoCentro).subscribe()
  }
}
