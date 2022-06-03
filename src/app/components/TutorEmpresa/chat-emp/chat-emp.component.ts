import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chat, Profesor } from 'src/app/utils/interfaces/Interface';
import { ProfesorService } from '../../Admin/profesor/profesor.service';
import { TutorEmpresaService } from '../tutor-empresa.service';
import Pusher from "pusher-js"
@Component({
  selector: 'app-chat-emp',
  templateUrl: './chat-emp.component.html',
  styleUrls: ['./chat-emp.component.css']
})
export class ChatEmpComponent implements OnInit, OnDestroy {
  public tutores: Profesor[] = []
  mensajes: Chat[] = []
  public auxmensajes: Chat[] = []
  public nuevoMensaje: string = ""
  receptor: string = ""
  mostrarChat: boolean = false
  public temporizador
  constructor(
    private tutorempresaService: TutorEmpresaService,
    private profesorsService: ProfesorService) { }

  ngOnInit(): void {
    this.listarTutores()
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
      this.listarMensaje()
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
      this.auxmensajes = []
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
  private listarTutores() {
    this.profesorsService.listarProfesor().subscribe((response) => {
      this.tutores = response;
    })
  }
  public enviarMensaje() {
    const chatobject: Chat = {
      "id": 0,
      "emisor": sessionStorage.getItem("username")!,
      "mensaje": this.nuevoMensaje,
      "receptor": this.receptor,
      "fecha": new Date()
    }
    if (this.nuevoMensaje != "") {
      this.tutorempresaService.insertarChat(chatobject).subscribe((rees) => {

        this.listarMensaje()
        this.scrollToTheLastElementByClassName()

      })
      this.nuevoMensaje = ""
    }
  }

  private scrollToTheLastElementByClassName() {
    let element = document.getElementsByClassName("msj");
    let ultimo: any = element[(element.length - 1)]
    let toppos = ultimo.offsetTop;
    console.log(toppos)
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
  public minimizar() {
    this.mostrarChat = false
    clearInterval(this.temporizador)
  }
}
