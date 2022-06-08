import { Component, OnInit } from '@angular/core';
import { Chat, Responsable } from 'src/app/utils/interfaces/Interface';
import { ResponsableService } from '../../Admin/responsable/responsable.service';
import { TutorEmpresaService } from '../../TutorEmpresa/tutor-empresa.service';
import Pusher from 'pusher-js';
/**
 * The chat esco component
 */
@Component({
  selector: 'app-chat-esco',
  templateUrl: './chat-esco.component.html',
  styleUrls: ['./chat-esco.component.css']
})
export class ChatEscoComponent implements OnInit {
  /**
   * Matriz de responsables
   */
  public responsables: Responsable[] = []
  /**
   * Matriz de mensajes
   */
  public mensajes: Chat[] = []
  /**
   * Matriz mensajes temporales
   */
  public auxmensajes: Chat[] = []
  /**
   * nuevo mensaje
   */
  public nuevoMensaje: string = ""
  /**
   * Dni receptor
   */
  public receptor: string = ""
  /**
   * Habilitar o deshabilitar chat
   */
  public mostrarChat: boolean = false
  /**
   * Constructor
   * @param tutorempresaService 
   * @param responsableService 
   */
  constructor(
    private tutorempresaService: TutorEmpresaService,
    private responsableService: ResponsableService) { }

  /**
   * NgOnInit
   */
  public ngOnInit(): void {
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
      this.listarMensaje()
      setTimeout(() => {
        this.scrollToTheLastElementByClassName()
      }, 100);
    });
  }
  /**
   * Metodo de enviar mensaje
   */
  public submit() {
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
            this.listarMensaje()
            this.scrollToTheLastElementByClassName()
          })
    }
  }
  /**
   * Metodo que lista los mensajes
   */
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
      setTimeout(() => {
        this.scrollToTheLastElementByClassName()
      }, 100);
    })
  }
  /**
   * Metodo que lista los responsables
   */
  public listarResponsables() {
    this.responsableService.listarResponsables().subscribe((response) => {
      this.responsables = response;
    })
  }
  /**
   * Mostrar ultimo mensaje enviado
   */
  scrollToTheLastElementByClassName() {
    let element = document.getElementsByClassName("msj");
    let ultimo: any = element[(element.length - 1)]
    let toppos = ultimo.offsetTop;
    //@ts-ignore
    document.getElementById("contenedorDeMensajes")?.scrollTop = toppos;
  }

  /**
   * Ocultar card chat
   */
   public ocultarChat() {
    this.mostrarChat = false
  }
  /**
   * Cerrar Chat
   */
  public cerrarChat(){
    this.auxmensajes=[]
    this.mostrarChat=false
    this.receptor=""
  }
  
}
