import { Component, OnInit } from '@angular/core';
import { Empresa, FCTAlumno } from 'src/app/utils/interfaces/Interface';
import { AlumnosService } from '../../alumnos/alumnos.service';
import { EmpresasService } from '../empresas.service';

@Component({
  selector: 'app-listar-empresas',
  templateUrl: './listar-empresas.component.html',
  styleUrls: ['./listar-empresas.component.css']
})
export class ListarEmpresasComponent implements OnInit {

  public mostrar:boolean=true
  public empresas:Empresa[]=[]
  public cargaCompleta:boolean=false
  public idEmpresa:number=0
  public alumnosfct: FCTAlumno[] = []
  public alumnosEmpresas:any[]=[]
  constructor(
    private empresaService:EmpresasService,
    private alumnoservice:AlumnosService) { }

  ngOnInit(): void {
    this.listarEmpresas()
    this.listarAlumnosFct()
  }
  listarEmpresas(){
    this.empresaService.listarEmpresas().subscribe((response)=>{
      this.empresas= response;
      this.cargaCompleta=true
    })
  }
  guardarid(idEmpresa:number){
    this.idEmpresa = idEmpresa;
  }
  eliminarEmpresa(){
    this.empresaService.eliminarEmpresa(this.idEmpresa).subscribe((response)=>{
      this.listarEmpresas()
    })
  }
  public listarAlumnosFct() {
    this.alumnoservice.listarAlumnosFCT().subscribe((response) => {
      this.alumnosfct = response
      console.log(this.alumnosfct)
    })
  }
}
