import { Component } from '@angular/core';
/**
 * Component App
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * Constructor
   */
  constructor() {
    if(!localStorage.getItem('modo')) localStorage.setItem("modo","claro")
      if (localStorage.getItem("modo") == "oscuro") {
        document.getElementsByTagName("body")[0].style.backgroundColor = "gray";
      } else {
        document.getElementsByTagName("body")[0].style.backgroundColor = "";
      }
  }
}
