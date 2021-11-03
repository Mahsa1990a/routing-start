import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // we can inject router:
  constructor(private routerProp: Router,
    private authServiceP: AuthService) { }

  ngOnInit() {
  }

  onLoadServersEvent() {
    // complex calculation
    // '/servers': is absolute path , 'servers': is relative path
    this.routerProp.navigate(['/servers']); //navigate through our route
  }

  onLoadServerEvent(serverId: number) {
    this.routerProp.
      navigate(
        ['/servers', serverId, 'edit'],
        {queryParams: {allowEdit: '1'}, fragment: 'loading'}
      );
  }

  onLogin() { //1sec after clicking login, it allow us to seec hilds of servers
    this.authServiceP.login();
  }
  onLogout() {
    this.authServiceP.logout();
  }

}
