import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-chat-esco',
  templateUrl: './chat-esco.component.html',
  styleUrls: ['./chat-esco.component.css']
})
export class ChatEscoComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  mensajes: any[] = []
  nuevoMensaje: string = ""
  receptor:string ="1"
  mostrarChat:boolean=false
  constructor() { }

  ngOnInit(): void {
    
  }
  cargarMensajes() {
    this.mensajes=[{
      emisor: "1",
      texto: "Hola que tal",
      receptor:"profesor"
    },
    {
      emisor: "profesor",
      texto: "Hola, todo bien",
      receptor:"1"
    },
    {
      emisor: "2",
      texto: "como te fue la tarde",
      receptor:"profesor"
    },
    {
      emisor: "profesor",
      texto: "Con algunos problemas",
      receptor:"2"
    }]
    this.mensajes= this.mensajes.filter(element=>element.receptor==this.receptor ||element.emisor==this.receptor )
    if(this.receptor!=""){ this.mostrarChat=true} else {
      this.mostrarChat=false
    } 
  }
  enviarMensaje() {
    this.mensajes.push({
      emisor: "profesor",
      texto: this.nuevoMensaje,
      receptor:this.receptor
    })
        console.log(this.nuevoMensaje)
    this.nuevoMensaje = ""
  }

}
