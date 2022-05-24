import { Component, OnInit } from '@angular/core';
import { Chat, Responsable } from 'src/app/Shared/interfaces/Interface';
import { ProfesorService } from '../../Admin/profesor/profesor.service';
import { ResponsableService } from '../../Admin/responsable/responsable.service';
import { TutorEmpresaService } from '../../TutorEmpresa/tutor-empresa.service';


@Component({
  selector: 'app-chat-esco',
  templateUrl: './chat-esco.component.html',
  styleUrls: ['./chat-esco.component.css']
})
export class ChatEscoComponent implements OnInit {
  public responsables: Responsable[] = []
  mensajes: Chat[] = []
  public auxmensajes:Chat[]=[]
  nuevoMensaje: string = ""
  receptor: string = ""
  mostrarChat: boolean = false
  constructor(
    private tutorempresaService: TutorEmpresaService,
    private responsableService: ResponsableService) { }

  ngOnInit(): void {
    this.listarResponsables()
    setInterval(()=>{
      this.listarMensaje()
    }, 1000)
  }
  cargarMensajes() {
   
    this.auxmensajes = this.mensajes.filter(element => 
     ( element.receptor == this.receptor && element.emisor == sessionStorage.getItem("username")) ||
     ( element.receptor == sessionStorage.getItem("username") && element.emisor == this.receptor)
   )
   console.log(this.auxmensajes)
    if (this.receptor != "") { this.mostrarChat = true } else {
      this.mostrarChat = false
    }
  }
  listarMensaje() {
    this.tutorempresaService.listarChat().subscribe((res) => {
      this.mensajes = res;
      this.cargarMensajes()
    })
  }
  public listarResponsables() {
    this.responsableService.listarResponsables().subscribe((response) => {
      this.responsables = response;
    })
  }
  enviarMensaje() {
    const chatobject: Chat = {
      "id": 0,
      "emisor": sessionStorage.getItem("username")!,
      "mensaje": this.nuevoMensaje,
      "receptor": this.receptor,
      "fecha": new Date()
    }
      console.log(chatobject)
    this.nuevoMensaje = ""
    this.tutorempresaService.insertarChat(chatobject).subscribe((rees)=>{
      console.log(rees,"gggggggggg")
      this.scrollToTheLastElementByClassName()
      this.listarMensaje()
    })
    setTimeout(() => {
    }, 10);
  }

  scrollToTheLastElementByClassName() {
    let element = document.getElementsByClassName("msj");
    let ultimo: any = element[(element.length - 1)]
    let toppos = ultimo.offsetTop;
    //@ts-ignore
    document.getElementById("contenedorDeMensajes")?.scrollTop = toppos;
  }

}
