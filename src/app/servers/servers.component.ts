import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(
    private serversService: ServersService,
    private routerProp: Router,
    // nject route for passing into relativeTo which is second arg of navigate
    private routeProp: ActivatedRoute
  ) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReloadEvent() {
    // unlike routerLink, navigate does not know on which route you are currently on, so both works
    // this.routerProp.navigate(['/servers']);   OR:
    // second arg: relative to which route, this link should be loaded by default
    // this.routerProp.navigate(['servers'], {relativeTo: this.routeProp}); not working
    this.routerProp.navigate(
      ['/servers'],
      {relativeTo: this.routeProp}
    );
  }

}
