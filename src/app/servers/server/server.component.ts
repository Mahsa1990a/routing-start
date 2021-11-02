import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
    private routePre: ActivatedRoute
    ) { }

  ngOnInit() {
    const getId = +this.routePre.snapshot.params['id']; //here id is not number 1 it's '1'(change it to number qith adding +)

    // this.server = this.serversService.getServer(1);
    this.server = this.serversService.getServer(getId);
    // Now for reacting to any changes there after:
    this.routePre.params
      .subscribe(
        (parameters: Params) => {
          // get a new server whenever params change
          this.server = this.serversService.getServer(+parameters['id']);//(change it to number qith adding +)
        }
      );
  }

}
