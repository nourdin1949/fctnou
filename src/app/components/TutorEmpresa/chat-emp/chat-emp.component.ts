import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-emp',
  templateUrl: './chat-emp.component.html',
  styleUrls: ['./chat-emp.component.css']
})
export class ChatEmpComponent implements OnInit {

  mensajes: any[] = []
  nuevoMensaje: string = ""
  receptor:string =""
  mostrarChat:boolean=false
  constructor() { }

  ngOnInit(): void {
    
  }
  cargarMensajes() {
    this.mensajes=[{
      emisor: "tutor",
      texto: "Hola que tal",
      receptor:"profesor"
    },
    {
      emisor: "profesor1",
      texto: "Hola, todo bien",
      receptor:"tutor"
    },
    {
      emisor: "tutor",
      texto: "como te fue la tarde",
      receptor:"profesor1"
    },
    {
      emisor: "profesor1",
      texto: "Con algunos problemas",
      receptor:"tutor"
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
setTimeout(() => {
  this.scrollToTheLastElementByClassName()
  
}, 10);  }

  scrollToTheLastElementByClassName(){
    let element = document.getElementsByClassName("msj");
    let ultimo:any = element[(element.length-1)]
    let toppos = ultimo.offsetTop;
    //@ts-ignore
    document.getElementById("contenedorDeMensajes")?.scrollTop=toppos;
  }
}
