import { AfterContentChecked, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificar-cursos',
  templateUrl: './modificar-cursos.component.html',
  styleUrls: ['./modificar-cursos.component.css']
})
export class ModificarCursosComponent implements OnInit,  AfterContentChecked{
  public id = "";
  cambiosChecked=0
  public nuevosDatos:object[]=[]
  public cursos: any[] = [{
            code: "DAW",
            familia: "Informatica",
            ciclo: "Grado Superior",
            cursoAcademico: "2021-2022",
            horas: 400,
            dniTutor: "4563894F",
          },
          {
            code: "DAM",
            familia: "Informatica",
            ciclo: "Grado Superior",
            cursoAcademico: "2020-2021",
            horas: 400,
            dniTutor: "3456346G",
          },
          {
            code: "ASIR",
            familia: "Informatica",
            ciclo: "Grado Superior",
            cursoAcademico: "2020-2021",
            horas: 440,
            dniTutor: "3453454D",
          },
        ]
  constructor(private activatedRoute: ActivatedRoute) {
    console.log()
    this.activatedRoute.params.subscribe(m => this.id = m['id'])
    
    
  }
  public contador = 0;

  ngOnInit(): void {
    
  }

  ngAfterContentChecked(): void {
    console.log(this.modificarCurso)

    if(this.cambiosChecked==2){
      let curso: object = {
        code: (<HTMLInputElement>document.getElementsByName('code')[0]).value,
        familia: (<HTMLInputElement>document.getElementsByName('familia')[0]).value,
        ciclo: (<HTMLInputElement>document.getElementsByName('ciclo')[0]).value,
        cursoAcademico: (<HTMLInputElement>document.getElementsByName('curso')[0]).value,
        horas: (<HTMLInputElement>document.getElementsByName('horas')[0]).value,
        dniTutor: (<HTMLInputElement>document.getElementsByName('dni')[0]).value,
      }
    
     console.log("Modificar", curso)
   
      console.log(this.cursos)
      console.log("cambiois checked")
      this.cursos.push(curso)
      console.log(curso)
      console.log(this.cursos)
    }this.cambiosChecked++
   
  }

  // Recuperamos los nuevos valores de los inputs y los guardamos en la bbdd usando servicio
  modificarCurso(): object {
    
    return this.cursos;
  }

  //Método que inserta inputs con valores para modificar
  comprobarLista(item: any) {
    // Si el id de la url es igual al id recibido en el metodo y contador a 0 return true
    if (item.code == "ASIR" && this.contador == 0) {

      // crear tds y añadirlas al dom del tr cuyo id es this.id
      let tr = document.createElement("tr");
      tr.id = "FilaInputs"
      let trBtn = document.createElement("tr");
      let td1 = document.createElement("td")
      let td2 = document.createElement("td")
      let td3 = document.createElement("td")
      let td4 = document.createElement("td")
      let td5 = document.createElement("td")
      let td6 = document.createElement("td")
      let tdBtn = document.createElement("td")
      tdBtn.colSpan = 6
      //declarar los input
      let CodeCiclo = document.createElement('input')
      let FamiliaProfesional = document.createElement('input')
      let CicloFormativo = document.createElement('input')
      let CursoAcademico = document.createElement('input')
      let NHoras = document.createElement('input')
      let DNITutor = document.createElement('input')
      let btn = document.createElement('input')
      // Propiedades de los inputs
      btn.type = "button"
      btn.value = "Guardar"
      btn.id="modificar"
      btn.classList.add("btn")
      btn.classList.add("btn-outline-success")
      btn.classList.add("w-100")
      btn.addEventListener('click', this.modificarCurso)
      CodeCiclo.value = item.code
      CodeCiclo.style.width = "70px"
      CodeCiclo.classList.add("form-control")
      CodeCiclo.name = "code"
      FamiliaProfesional.value = item.familia
      FamiliaProfesional.style.width = "150px"
      FamiliaProfesional.classList.add("form-control")
      FamiliaProfesional.name = "familia"
      CicloFormativo.value = item.ciclo
      CicloFormativo.style.width = "150px"
      CicloFormativo.classList.add("form-control")
      CicloFormativo.name = "ciclo"
      CursoAcademico.value = item.cursoAcademico
      CursoAcademico.style.width = "100px"
      CursoAcademico.classList.add("form-control")
      CursoAcademico.name = "curso"
      NHoras.value = item.horas
      NHoras.style.width = "80px"
      NHoras.classList.add("form-control")
      NHoras.name = "horas"
      DNITutor.value = item.dniTutor
      DNITutor.style.width = "130px"
      DNITutor.classList.add("form-control")
      DNITutor.name = "dni"
      // añadir filas despues de la fila cuyo valores vamos a modificar
      document.getElementById("ASIR")?.insertAdjacentElement("afterend", tr)
      document.getElementById('FilaInputs')?.insertAdjacentElement("afterend", trBtn)
      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
      tr.appendChild(td4)
      tr.appendChild(td5)
      tr.appendChild(td6)
      trBtn.appendChild(tdBtn)
      // añadir los inputs a los tds indicados
      td1.appendChild(CodeCiclo)
      td2.appendChild(FamiliaProfesional)
      td3.appendChild(CicloFormativo)
      td4.appendChild(CursoAcademico)
      td5.appendChild(NHoras)
      td6.appendChild(DNITutor)
      tdBtn.appendChild(btn)
      this.contador++;
      return true
    }
    else {
      return false
    }
  }
}
