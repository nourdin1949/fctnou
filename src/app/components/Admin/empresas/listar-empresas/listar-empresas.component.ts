import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-empresas',
  templateUrl: './listar-empresas.component.html',
  styleUrls: ['./listar-empresas.component.css']
})
export class ListarEmpresasComponent implements OnInit {

  public empresas: string []=["NTTDATA","EVERIS","VIEWNEXT","FCTR"]
  public listaempresas: number[]=[1,2,3,4,5,6]
  public alumnosEmpresas:number[]=[1,2,3,4,5,6]
  constructor() { }

  ngOnInit(): void {
  }

}
