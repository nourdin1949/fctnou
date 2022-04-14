import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-empresas',
  templateUrl: './modificar-empresas.component.html',
  styleUrls: ['./modificar-empresas.component.css']
})
export class ModificarEmpresasComponent {
  public id = "";
  public empresas: any[] = [{
            id:"1",
            nombre: "DAW",
            representante: "Juan Ramirez",
            cif: "2342_CIF",
            email: "nttdata@gmail.com",
          },
          {
            id:"2",
            nombre: "DAW",
            representante: "Juan Ramirez",
            cif: "2342_CIF",
            email: "nttdata@gmail.com",
          },
          {
            id:"3",
            nombre: "DAW",
            representante: "Juan Ramirez",
            cif: "2342_CIF",
            email: "nttdata@gmail.com",
          },
        ]
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    console.log()
    this.activatedRoute.params.subscribe(m => this.id = m['id'])
   
  }
  public contador = 0;

  // Recuperamos los nuevos valores de los inputs y los guardamos en la bbdd usando servicio
    modificarEmpresa() {
     
      
    let empresa: object = {
      id:"1",
      nombre: (<HTMLInputElement>document.getElementsByName('nombre')[0]).value,
      representante: (<HTMLInputElement>document.getElementsByName('representante')[0]).value,
      cif: (<HTMLInputElement>document.getElementsByName('cif')[0]).value,
      email: (<HTMLInputElement>document.getElementsByName('email')[0]).value,
    }
    
    this.empresas.push(empresa)
    
    console.log("Modificar", empresa)
   
  }

  //Método que inserta inputs con valores para modificar
  comprobarLista(item: any) {
    // Si el id de la url es igual al id recibido en el metodo y contador a 0 return true
    if (item.id == 2 && this.contador == 0) {

      // crear tds y añadirlas al dom del tr cuyo id es this.id
      let tr = document.createElement("tr");
      tr.id = "FilaInputs"
      let trBtn = document.createElement("tr");
      let td1 = document.createElement("td")
      let td2 = document.createElement("td")
      let td3 = document.createElement("td")
      let td4 = document.createElement("td")
      let tdBtn = document.createElement("td")
      tdBtn.colSpan = 6
      //declarar los input
      let nombre = document.createElement('input')
      let representante = document.createElement('input')
      let cif = document.createElement('input')
      let email = document.createElement('input')
      let btn = document.createElement('input')
      // Propiedades de los inputs
      btn.type = "button"
      btn.value = "Guardar "
      btn.classList.add("btn")
      btn.classList.add("btn-outline-success")
      btn.classList.add("w-100")
      btn.addEventListener('click', this.modificarEmpresa)
      nombre.value = item.nombre
      nombre.style.width = "70px"
      nombre.classList.add("form-control")
      nombre.name = "nombre"
      representante.value = item.representante
      representante.style.width = "150px"
      representante.classList.add("form-control")
      representante.name = "representante"
      cif.value = item.cif
      cif.style.width = "150px"
      cif.classList.add("form-control")
      cif.name = "cif"
      email.value = item.email
      email.type="email"
      email.style.width = "180px"
      email.classList.add("form-control")
      email.name = "email"
      
      // añadir filas despues de la fila cuyo valores vamos a modificar
      document.getElementById("2")?.insertAdjacentElement("afterend", tr)
      document.getElementById('FilaInputs')?.insertAdjacentElement("afterend", trBtn)
      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
      tr.appendChild(td4)
      
      trBtn.appendChild(tdBtn)
      // añadir los inputs a los tds indicados
      td1.appendChild(nombre)
      td2.appendChild(representante)
      td3.appendChild(cif)
      td4.appendChild(email)
      
      tdBtn.appendChild(btn)
      
      this.contador++;
   
     
    }
  }

}
