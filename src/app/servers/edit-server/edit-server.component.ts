import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  constructor(
    private serversService: ServersService,
    private routeProp: ActivatedRoute
  ) { }

  ngOnInit() {
    // using snapshot: this is only run or updated at the time this component is created
    console.log("queryParams: ===> ", this.routeProp.snapshot.queryParams); //{allowEdit: "1"}(coming from server component)
    console.log("fragment: ===>", this.routeProp.snapshot.fragment);//loading(coming from server component)

    // REACT to change query parameters:  (For making sure you're not missing data)
    this.routeProp.queryParams.subscribe();
    this.routeProp.fragment.subscribe();
    ///////////////////////

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService
    .updateServer(
      this.server.id,
      {name: this.serverName, status: this.serverStatus}
    );
  }

}
