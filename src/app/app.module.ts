import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';

const appRoutes: Routes = [
  // path: after domin in url(localhost:4200/users), component: is action, which component should load
  { path: '', component: HomeComponent },

  { path: 'servers', component: ServersComponent, children: [ //adding child route, nested childs needs their own <router-outlet>
    // { path: 'servers/:id', component: ServerComponent }, after adding as child:
    { path: ':id', component: ServerComponent },
    // { path: 'servers/:id/edit', component: EditServerComponent }, //after adding as child:
    { path: ':id/edit', component: EditServerComponent }, //add new route
    ]
  },


  { path: 'users', component: UsersComponent, children: [
    // route for single user => : shows this idDynamic is dynamic
    { path: ':idDynamic/:nameDynamic', component: UserComponent } //assign single UserComponent
    // can add as many as dynamic property here ^ and retrive from component
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // gister routes into our app:
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
