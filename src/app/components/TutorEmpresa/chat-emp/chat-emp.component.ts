import { Component, OnInit } from '@angular/core';
import { Chat, Profesor } from 'src/app/utils/interfaces/Interface';
import { ProfesorService } from '../../Admin/profesor/profesor.service';
import { TutorEmpresaService } from '../tutor-empresa.service';
import Pusher from "pusher-js"
/**
 * The chat emp component
 */
@Component({
  selector: 'app-chat-emp',
  templateUrl: './chat-emp.component.html',
  styleUrls: ['./chat-emp.component.css']
})
export class ChatEmpComponent implements OnInit {
  /**
   * Matriz de tutores
   */
  public tutores: Profesor[] = []
  /**
   * Matriz de mensajes
   */
  public mensajes: Chat[] = []
  /**
   * Matriz de mensajes temporales
   */
  public auxmensajes: Chat[] = []
  /**
   * Mensaje nuevo
   */
  public nuevoMensaje: string = ""
  /**
   * dni del tutor
   */
  public receptor: string = ""
  /**
   * Mostrar card chat
   */
  public mostrarChat: boolean = false
  /**
   * Constructor
   * @param tutorempresaService 
   * @param profesorsService 
   */
  constructor(
    private tutorempresaService: TutorEmpresaService,
    private profesorsService: ProfesorService) { }
  /**
   * NgOnInit
   */
  public ngOnInit(): void {
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
  /**
   * Metodo enviar mensaje al servidor
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
  public listarMensaje() {
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
  /**
   * Metodo para listar tutores
   */
  private listarTutores() {
    this.profesorsService.listarProfesor().subscribe((response) => {
      this.tutores = response;
    })
  }
  /**
   * Mostrar ultimo mensaje enviado
   */
  private scrollToTheLastElementByClassName() {
    let element = document.getElementsByClassName("msj");
    let ultimo: any = element[(element.length - 1)]
    let toppos = ultimo.offsetTop;
    console.log(toppos)
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
