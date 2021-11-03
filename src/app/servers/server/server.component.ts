import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService,
    private routePre: ActivatedRoute,
    private routerPre: Router
    ) { }

  ngOnInit() {
    // const getId = +this.routePre.snapshot.params['id']; //here id is not number 1 it's '1'(change it to number qith adding +)

    // // this.server = this.serversService.getServer(1);
    // this.server = this.serversService.getServer(getId);
    // // Now for reacting to any changes there after:
    // this.routePre.params
    //   .subscribe(
    //     (parameters: Params) => {
    //       // get a new server whenever params change
    //       this.server = this.serversService.getServer(+parameters['id']);//(change it to number qith adding +)
    //     }
    //   );                   USING RESOLVER:

    this.routePre.data
    .subscribe(
      (dataP: Data) => {
        this.server = dataP['serverProperty'];
      }
    );
  }

  onEdit() { //with this event want to navigate into edit-server component
    // 1.First need to access to router in constructor
    // 2.Navigate:
    //                      // or just: ['edit']
    this.routerPre.navigate(
      ['/servers', this.server.id, 'edit'],
      //refrence to currently loaded route
      {relativeTo: this.routePre, queryParamsHandling: 'preserve'});// queryParamsHandling: 'preserve'(for over writing old one)
  }

}
