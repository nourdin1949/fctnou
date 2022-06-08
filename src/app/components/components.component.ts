import { Component } from '@angular/core';
/**
 * The components component
 */
@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent {
  /**
   * Constructor
   */
  constructor() {
    setTimeout(() => {
      if (localStorage.getItem("modo") == "oscuro") {
        document.getElementsByTagName("body")[0].style.backgroundColor = "gray";
        document.getElementsByTagName("body")[0].style.color = "black";
        (<HTMLElement>document.getElementsByClassName("sidebar")[0]).style.backgroundColor = "gray";
        (<HTMLElement>document.getElementsByClassName("sidebar")[1]).style.backgroundColor = "gray";
        (<HTMLElement>document.getElementById("menu")).classList.remove("bg-light");
        (<HTMLElement>document.getElementById("menu")).style.backgroundColor = "gray";
      } else {
        document.getElementsByTagName("body")[0].style.backgroundColor = "";
        (<HTMLElement>document.getElementsByClassName("sidebar")[0]).style.backgroundColor = "";
        (<HTMLElement>document.getElementsByClassName("sidebar")[1]).style.backgroundColor = "";
        (<HTMLElement>document.getElementById("menu")).classList.add("bg-light");
        (<HTMLElement>document.getElementById("menu")).style.backgroundColor = "";
      }
    }, 300);
  }
}

