import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'angular-poject';
  dataReady = false; // Loader boolen.
  clickToggle = false; // Mouseover boolean

  // ***********************
  // ***********************
  // This is child to parent communication.
  // Used @Output in the child component.
  // ***********************
  // ***********************
  checkHoverStatus (toggleClass: boolean) {
      this.clickToggle = toggleClass
  }

  // ************************ 
  // ************************ 
  // Adding a custom loader to show the interactions.
  // ************************ 
  // ************************ 
  timer: Object = setTimeout(()=> {
    this.dataReady = true;
  }, 3000)
}
