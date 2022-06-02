import { Component, OnDestroy, OnInit } from '@angular/core';
import { timeout } from 'rxjs';
import { Chat, Responsable } from 'src/app/utils/interfaces/Interface';
import { ProfesorService } from '../../Admin/profesor/profesor.service';
import { ResponsableService } from '../../Admin/responsable/responsable.service';
import { TutorEmpresaService } from '../../TutorEmpresa/tutor-empresa.service';
import Pusher from 'pusher-js';

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
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher('1ca38c79cc208ff79a17', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('fctnou');
    channel.bind('my-event', function (data) {
      alert(JSON.stringify(data));
    });
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
      setTimeout(() => {
        this.scrollToTheLastElementByClassName()
      }, 100);
      this.listarMensaje()
    })

  }

  scrollToTheLastElementByClassName() {
    let element = document.getElementsByClassName("msj");
    let ultimo: any = element[(element.length - 1)]
    console.log(ultimo.offsetTop)
    console.log(ultimo)
    let toppos = ultimo.offsetTop;
    //@ts-ignore
    document.getElementById("contenedorDeMensajes")?.scrol = toppos+1000;
  }
  ngOnDestroy(): void {
      clearInterval(this.temporizador)
  }
  public ocultarChat(){
    this.mostrarChat=false
    clearInterval(this.temporizador)
  }
}
