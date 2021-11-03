import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEditP:boolean = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private routeProp: ActivatedRoute,
    private routerP: Router
  ) { }

  ngOnInit() {
    // using snapshot: this is only run or updated at the time this component is created
    console.log("queryParams: ===> ", this.routeProp.snapshot.queryParams); //{allowEdit: "1"}(coming from server component)
    console.log("fragment: ===>", this.routeProp.snapshot.fragment);//loading(coming from server component)

    // REACT to change query parameters:  (For making sure you're not missing data)
    // retrieve our queryParams:
    this.routeProp.queryParams.subscribe(
      (queryParamsss: Params) => {
        this.allowEditP = queryParamsss['allowEdit'] === '1' ? true : false;
      }
    );
    this.routeProp.fragment.subscribe();
    ///////////////////////

    const id = +this.routeProp.snapshot.params['id']
    // this.server = this.serversService.getServer(1);
    this.server = this.serversService.getServer(id);
    // subscribe route params to update the id if params changed

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService
    .updateServer(
      this.server.id,
      {name: this.serverName, status: this.serverStatus}
    );
    this.changesSaved = true; // after this, I want to navigate away
      this.routerP.navigate(['../'], {relativeTo: this.routeProp})
  }

  canDeactive(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEditP) {
      return true;
    }
    if (
      (this.serverName !== this.server.name || this.serverStatus !== this.server.status)
      && !this.changesSaved
      ) {
        return confirm("Do you want to discard the changes?")
    } else {
      return true;
    }
  }

}
