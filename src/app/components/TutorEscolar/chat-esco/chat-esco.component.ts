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
export class ChatEscoComponent implements OnInit {
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

    const channel = pusher.subscribe('chat');
    channel.bind('message', data => {

      this.mensajes.push(data)
      this.auxmensajes = this.mensajes.filter(element =>
        (element.receptor == this.receptor && element.emisor == sessionStorage.getItem("username")) ||
        (element.receptor == sessionStorage.getItem("username") && element.emisor == this.receptor)
      )
      setTimeout(() => {
        this.scrollToTheLastElementByClassName()
      }, 100);
      //alert(JSON.stringify(data));
    });
  }
  submit() {
    const chatobject: Chat = {
      "id": 0,
      "emisor": sessionStorage.getItem("username")!,
      "mensaje": this.nuevoMensaje,
      "receptor": this.receptor,
      "fecha": new Date()
    }
    if (this.nuevoMensaje != "") {
      this.tutorempresaService.insertarChat(chatobject)
        .subscribe(
          () => {
            this.nuevoMensaje = ""
            this.scrollToTheLastElementByClassName()
          })
    }

  }
  listarMensaje() {
    if (this.receptor != "") { this.mostrarChat = true } else {
      this.mostrarChat = false
      this.auxmensajes=[]
    }
    this.tutorempresaService.listarChat().subscribe((res) => {
      this.mensajes = res;
       this.auxmensajes = this.mensajes.filter(element =>
      (element.receptor == this.receptor && element.emisor == sessionStorage.getItem("username")) ||
      (element.receptor == sessionStorage.getItem("username") && element.emisor == this.receptor)
    )
    console.log(this.auxmensajes)
    setTimeout(() => {
              this.scrollToTheLastElementByClassName()
            }, 100);
    })
  }
  public listarResponsables() {
    this.responsableService.listarResponsables().subscribe((response) => {
      this.responsables = response;
    })
  }
  // enviarMensaje() {
  //   const chatobject: Chat = {
  //     "id": 0,
  //     "emisor": sessionStorage.getItem("username")!,
  //     "mensaje": this.nuevoMensaje,
  //     "receptor": this.receptor,
  //     "fecha": new Date()
  //   }
  //   console.log(chatobject)
  //   this.nuevoMensaje = ""
  //   if (this.nuevoMensaje != "") {
  //     this.tutorempresaService.insertarChat(chatobject).subscribe((rees) => {
  //       setTimeout(() => {
  //         this.scrollToTheLastElementByClassName()
  //       }, 100);
  //     })
  //   }
  // }

  scrollToTheLastElementByClassName() {
    let element = document.getElementsByClassName("msj");
    let ultimo: any = element[(element.length - 1)]
    console.log(ultimo.offsetTop)
    console.log(ultimo)
    let toppos = ultimo.offsetTop;
    //@ts-ignore
    document.getElementById("contenedorDeMensajes")?.scrollTop = toppos;
  }
  ngOnDestroy(): void {
    clearInterval(this.temporizador)
  }
  public ocultarChat() {
    this.mostrarChat = false
    clearInterval(this.temporizador)
  }
  public mostrarCardChat() {
    if (this.receptor != "") { this.mostrarChat = true } else {
      this.mostrarChat = false
      this.auxmensajes=[]
    }
  }
}
