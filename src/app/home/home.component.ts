import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // we can inject router:
  constructor(private routerProp: Router) { }

  ngOnInit() {
  }

  onLoadServersEvent() {
    // complex calculation
    // '/servers': is absolute path , 'servers': is relative path
    this.routerProp.navigate(['/servers']); //navigate through our route
  }

}
