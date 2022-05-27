import { Component, OnInit } from '@angular/core';
import { Responsable } from 'src/app/Shared/interfaces/Interface';
import { ResponsableService } from '../responsable.service';

@Component({
  selector: 'app-listar-responsable',
  templateUrl: './listar-responsable.component.html',
  styleUrls: ['./listar-responsable.component.css']
})
export class ListarResponsableComponent implements OnInit {
  public responsables: Responsable[] = []
  public idResponsable: number = 0
  public cargaCompleta:boolean=false

  constructor(private responsbaleService: ResponsableService) { }

  ngOnInit(): void {
    this.listarResponsbles()
  }

  listarResponsbles() {
    this.responsbaleService.listarResponsables().subscribe((response) => {
      this.responsables = response;
      this.cargaCompleta=true

    })
  }

  guardarid(idResponsable: number) {
    this.idResponsable = idResponsable
  }
  eliminarResponsable() {
    this.responsbaleService.eliminarResponsable(this.idResponsable)
      .subscribe((response)=>{
          this.listarResponsbles()
      })
  }

}
