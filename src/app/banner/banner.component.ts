import { Component, OnInit, Output,  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor() { }
  toggleClass = false;
  @Output() toggleClassStatus = new EventEmitter<boolean>();
  ngOnInit(): void {
  }

  // **************************** 
  // **************************** 
  //Mouseover events
  // **************************** 
  // **************************** 
  
  changebg () {
    this.toggleClass = true;
    this.toggleClassStatus.emit(this.toggleClass)
  }

  backtobg () {
    this.toggleClass = false;
    this.toggleClassStatus.emit(this.toggleClass)
  }
}
