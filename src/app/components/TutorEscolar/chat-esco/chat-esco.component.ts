import { Component, OnDestroy, OnInit } from '@angular/core';
import { timeout } from 'rxjs';
import { Chat, Responsable } from 'src/app/Shared/interfaces/Interface';
import { ProfesorService } from '../../Admin/profesor/profesor.service';
import { ResponsableService } from '../../Admin/responsable/responsable.service';
import { TutorEmpresaService } from '../../TutorEmpresa/tutor-empresa.service';


@Component({
  selector: 'app-chat-esco',
  templateUrl: './chat-esco.component.html',
  styleUrls: ['./chat-esco.component.css']
})
export class ChatEscoComponent implements OnInit, OnDestroy {
  public responsables: Responsable[] = []
  mensajes: Chat[] = []
  public auxmensajes: Chat[] = []
  nuevoMensaje: string = ""
  receptor: string = ""
  mostrarChat: boolean = false
  public temporizador
  constructor(
    private tutorempresaService: TutorEmpresaService,
    private responsableService: ResponsableService) { }

  ngOnInit(): void {
    this.listarResponsables()
   
  }
  cargarMensajes() {

    this.temporizador = setInterval(() => {
      this.listarMensaje()
    }, 2000)
    
  }
  listarMensaje() {
    this.tutorempresaService.listarChat().subscribe((res) => {
      this.mensajes = res;
    })
    this.auxmensajes = this.mensajes.filter(element =>
      (element.receptor == this.receptor && element.emisor == sessionStorage.getItem("username")) ||
      (element.receptor == sessionStorage.getItem("username") && element.emisor == this.receptor)
    )
    console.log(this.auxmensajes)
    if (this.receptor != "") { this.mostrarChat = true } else {
      this.mostrarChat = false
    }
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
    this.tutorempresaService.insertarChat(chatobject).subscribe((rees) => {
      this.scrollToTheLastElementByClassName()
      this.listarMensaje()
    })

  }

  scrollToTheLastElementByClassName() {
    let element = document.getElementsByClassName("msj");
    let ultimo: any = element[(element.length - 1)]
    let toppos = ultimo.offsetTop;
    //@ts-ignore
    document.getElementById("contenedorDeMensajes")?.scrollTop = toppos;
  }
  ngOnDestroy(): void {
      clearInterval(this.temporizador)
  }

}
