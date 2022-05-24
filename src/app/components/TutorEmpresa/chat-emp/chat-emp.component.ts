import { Component, OnInit } from '@angular/core';
import { Chat, Profesor } from 'src/app/Shared/interfaces/Interface';
import { ProfesorService } from '../../Admin/profesor/profesor.service';
import { TutorEmpresaService } from '../tutor-empresa.service';

@Component({
  selector: 'app-chat-emp',
  templateUrl: './chat-emp.component.html',
  styleUrls: ['./chat-emp.component.css']
})
export class ChatEmpComponent implements OnInit {
  public tutores: Profesor[] = []
  mensajes: Chat[] = []
  public auxmensajes:Chat[]=[]
  public nuevoMensaje: string = ""
  receptor: string = ""
  mostrarChat: boolean = false
  constructor(
    private tutorempresaService: TutorEmpresaService,
    private profesorsService: ProfesorService) { }

  ngOnInit(): void {
    this.listarTutores()
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
  listarTutores() {
    this.profesorsService.listarProfesor().subscribe((response) => {
      this.tutores = response;
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
