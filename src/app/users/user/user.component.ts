import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: {id: number, name: string};

  // by injecting this, we'll get access to currently loaded route
  // this currently loaded route is a js object with a lot of meta data about the currently loaded route
  // ActivatedRoute object give us access to id passed in URL => Selected User
  constructor(private routeProp: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      // value for id can be fetch from route:
      id: this.routeProp.snapshot.params['idDynamic'], //idDynamic : the property you defined with route
      name: this.routeProp.snapshot.params['nameDynamic'] //any dynamic property in route would be retrivable here
    }

    // to be able to reaction to subsequent changes(routerLink in temp) we need:
    //params is observable, observables are feature(third party package) allow you easily work with async tasks
    this.routeProp.params // to not block your code
      .subscribe( //it will update user id & name whenever parameter change:
        (updatedParams: Params) => {
          this.user.id = updatedParams['idDynamic'];
          this.user.name = updatedParams['nameDynamic'];
        }
      );

  }

}
