import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Empresa, FCTAlumno } from 'src/app/utils/interfaces/Interface';
import { AlumnosService } from '../../alumnos/alumnos.service';
import { EmpresasService } from '../empresas.service';
/**
 * The listar empresas components
 */
@Component({
  selector: 'app-listar-empresas',
  templateUrl: './listar-empresas.component.html',
  styleUrls: ['./listar-empresas.component.css']
})
export class ListarEmpresasComponent implements OnInit {
  /**
   * Matriz empresas
   */
  public empresas: Empresa[] = []
  /**
   * Carga completa
   */
  public cargaCompleta: boolean = false
  /**
   * ID empresa
   */
  public idEmpresa: number = 0
  /**
   * Matriz alumnosfct
   */
  public alumnosfct: FCTAlumno[] = []
  // Paginación campos
  /**
   * Empresas temporales en matriz
   */
  public empresasTmp: Empresa[] = []
  /**
   * Total de empresas
   */
  public totalElements: number;
  /**
   * Pagina actual
   */
  @Input()
  public currentPage: number = 1;
  /**
   * Total de paginas
   */
  @Input()
  public totalPages: number = 0;
  /**
   * Numero de filas a mostrar en la tabla
   */
  @Input()
  public pageSize: number = 5;
  /**
   * Tamaños de página a elegir
   */
  public sizes: number[] = [5, 10, 15, 20];
  /**
   * Constructor
   * @param empresaService 
   * @param alumnoservice 
   */
  constructor(
    private empresaService: EmpresasService,
    private alumnoservice: AlumnosService,
    private _snackBar: MatSnackBar) {
  }
  /**
   * NgOnInit
   */
  ngOnInit(): void {
    this.listarEmpresas()
    this.listarAlumnosFct()
  }

  /**
   * Metodo listar empresas
   */
  public listarEmpresas() {
    this.empresaService.listarEmpresas()
      .subscribe(
        (response) => {
          this.empresas = response;
          this.cargaCompleta = true
          this.totalElements = this.empresas.length
          this.totalPages = Math.ceil(this.totalElements / this.pageSize)
          this.empresasTmp = []
          for (let i = 0; i < this.pageSize * this.currentPage && this.empresas.length > i; i++) {
            this.empresasTmp[i] = this.empresas[i];
          }
        })
  }
  /**
   * metodo guardar id
   * @param idEmpresa 
   */
  public guardarid(idEmpresa: number) {
    this.idEmpresa = idEmpresa;
  }
  /**
   * Metodo eliminar empresa
   */
  public eliminarEmpresa() {
    this.empresaService.eliminarEmpresa(this.idEmpresa)
      .subscribe(
        () => {
          this.listarEmpresas()
          this.openSnackBar()
          this.firstPage()
        })
  }
   /**
   * metodo open snack bar al eliminar
   */
    public openSnackBar() {
      this._snackBar.open("Eliminado con éxito", "Close",
      {
        duration: 3000
      });
    }
  /**
   * Metodo listar alumnos fct
   */
  public listarAlumnosFct() {
    this.alumnoservice.listarAlumnosFCT().subscribe((response) => {
      this.alumnosfct = response
      console.log(this.alumnosfct)
    })
  }
  /**
  * Metodo dirige a la primera página
  * @returns 
  */
  public firstPage() {
    if (this.currentPage === 1) {
      return false;
    }

    this.currentPage = 1;
    let x = 0;
    for (let i = this.pageSize * this.currentPage - 1; i > this.pageSize * (this.currentPage - 1) - 1; i--) {
      this.empresasTmp[x] = this.empresas[i]
      x++;
    }
    this.empresasTmp = this.empresasTmp.sort(function (a, b) { return a.id - b.id; });

    return true
  }
  /**
   * Método dirige a la siguiente pagina
   * @returns 
   */
  public nextPage() {
    if (this.currentPage >= this.totalPages) {
      return false;
    }
    this.currentPage++;

    this.empresasTmp = []

    let x = 0
    for (let i = this.pageSize * (this.currentPage - 1); i < this.pageSize * this.currentPage && this.empresas.length > i; i++) {
      this.empresasTmp[x] = this.empresas[i]
      x++;
    }

    return true
  }
  /**
     * Método dirige a la anteriro pagina
     * @returns 
     */
  public prevPage() {
    if (this.currentPage <= 1) {
      return false;
    }
    this.currentPage--;

    this.empresasTmp = []
    let x = 0
    for (let i = this.pageSize * this.currentPage - 1; i > this.pageSize * (this.currentPage - 1) - 1; i--) {
      this.empresasTmp[x] = this.empresas[i]
      x++;
    }
    this.empresasTmp = this.empresasTmp.sort(function (a, b) { return a.id - b.id; });

    return true
  }
  /**
   * Método dirige a la ultima pagina
   * @returns 
   */
  public lastPage() {
    if (this.currentPage === this.totalPages) {
      return false;
    }
    this.currentPage = this.totalPages;

    this.empresasTmp = []
    let x = 0;
    for (let i = this.pageSize * (this.currentPage - 1); i < this.pageSize * this.currentPage && this.empresas.length > i; i++) {
      this.empresasTmp[x] = this.empresas[i]
      x++;
    }

    return true
  }
  /**
   * Cambiar tamaño de la pagina
   */
  public changeSize() {
    this.currentPage = 1
    this.listarEmpresas()
  }
}
