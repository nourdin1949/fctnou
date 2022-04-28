import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-esco',
  templateUrl: './chat-esco.component.html',
  styleUrls: ['./chat-esco.component.css']
})
export class ChatEscoComponent implements OnInit {
  // chat : any[]=[{
  //   envia
  // }]
  mensajes: any[] = []
  nuevoMensaje: string = ""
  receptor:string =""
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
