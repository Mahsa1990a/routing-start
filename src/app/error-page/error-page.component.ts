import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  errMsg: string;

  constructor(private routeP: ActivatedRoute) { }

  ngOnInit(): void {
    // this.errMsg = this.routeP.snapshot.data['meesage']; using this or:
    this.routeP.data.subscribe(
      (newDataObj: Data) => {
        this.errMsg = newDataObj['message'];
      }
    )
  }

}
