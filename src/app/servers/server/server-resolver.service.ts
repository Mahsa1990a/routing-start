import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ServersService } from "../servers.service";

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()

// Resolve interface => it's a generic type and it should wrap which ever item or data fill you will fetch here at the end
// export class ServerResolver implements Resolve<{id: number, name: string, status: string}> { OR:
export class ServerResolver implements Resolve<Server> {

  constructor(private serversServiceP: ServersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serversServiceP.getServer(+route.params['id']);
  }
}
