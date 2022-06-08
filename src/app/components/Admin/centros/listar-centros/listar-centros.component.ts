import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Centro, Curso } from 'src/app/utils/interfaces/Interface';
import { CentrosService } from '../centros.service';
/**
 * The listar cenro component
 */

@Component({
  selector: 'app-listar-centros',
  templateUrl: './listar-centros.component.html',
  styleUrls: ['./listar-centros.component.css']
})
export class ListarCentrosComponent implements OnInit {
  /**
   * matriz centros
   */
  public centros: Centro[] = []
  /**
   * Codigo centro
   */
  public codigoCentro: number = 0
  /**
   * Carga completa
   */
  public cargaCompleta: boolean = false
  // Paginación campos
  /**
   * Centros temporales en matriz
   */
   public centrosTmp: Centro[] = []
   /**
    * Total de centros
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
   * @param centroService 
   * @param _snackBar 
   */
  constructor(private centroService: CentrosService, private _snackBar:MatSnackBar) { }
  /**
   * NgOnInit
   */
  ngOnInit(): void {
    this.listarCentros();
  }
  /**
   * Metodo Listar Centros
   */
  public  listarCentros() {
    this.centroService.listarCentros()
    .subscribe(
      (response) => {
      this.centros = response;
      this.cargaCompleta = true
      this.totalElements = this.centros.length
      this.totalPages = Math.ceil(this.totalElements / this.pageSize)
      this.centrosTmp = []
      this.centros = this.centros.sort(function (a, b) { return a.codigo - b.codigo; });
      for (let i = 0; i < this.pageSize * this.currentPage && this.centros.length > i; i++) {
        this.centrosTmp[i] = this.centros[i];
      }
    })
  }
  /**
   * Metodo guardar codigo
   * @param codigo 
   */
  public guardarcodigo(codigo: number) {
    this.codigoCentro = codigo;
  }
  /**
   * Metodo eliminar Centro
   */
  public eliminarCentro() {
    this.centroService.eliminarCentro(this.codigoCentro)
      .subscribe(
        () => {
          this.openSnackBar()
          this.listarCentros()
          this.firstPage()
        })
  }
  /**
   * Metodo snckbar al eliminar
   */
  public openSnackBar() {
    this._snackBar.open("Eliminado con éxito", "Close",
      {
        duration: 3000
      });
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
        this.centrosTmp[x] = this.centros[i]
        x++;
      }
      this.centrosTmp = this.centrosTmp.sort(function (a, b) { return a.codigo - b.codigo; });
  
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
  
      this.centrosTmp = []
  
      let x = 0
      for (let i = this.pageSize * (this.currentPage - 1); i < this.pageSize * this.currentPage && this.centros.length > i; i++) {
        this.centrosTmp[x] = this.centros[i]
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
  
      this.centrosTmp = []
      let x = 0
      for (let i = this.pageSize * this.currentPage - 1; i > this.pageSize * (this.currentPage - 1) - 1; i--) {
        this.centrosTmp[x] = this.centros[i]
        x++;
      }
      this.centrosTmp = this.centrosTmp.sort(function (a, b) { return a.codigo - b.codigo; });
  
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
  
      this.centrosTmp = []
      let x = 0;
      for (let i = this.pageSize * (this.currentPage - 1); i < this.pageSize * this.currentPage && this.centros.length > i; i++) {
        this.centrosTmp[x] = this.centros[i]
        x++;
      }
  
      return true
    }
    /**
     * Cambiar tamaño de la pagina
     */
    public changeSize() {
      this.currentPage = 1
      this.listarCentros()
    }
}
