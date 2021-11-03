import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./auth-guard.service";

import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = [
  // path: after domin in url(localhost:4200/users), component: is action, which component should load
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  //                 by adding this we want to guard servers and it's chil routes
  {
    path: 'servers',
    // canActivate: [AuthGuardService],  after adding canActivateChild in service:
    canActivateChild: [AuthGuardService], // AuthGuardService protect all route and it's childs
    component: ServersComponent,
    children: [ //adding child route, nested childs needs their own <router-outlet>
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

  // for unkown routes:
  {path: 'not-found', component: PageNotFoundComponent},
  //           If don't want to specify components: use redirectTo: 'the path'(it redirect automatically to /not-found route)
  {path: '**', redirectTo: '/not-found'} //should be the last one(route pars from top to bottom)
  // for unkown routes
];

@NgModule({//decorator
  imports: [
    RouterModule.forRoot(appRoutes) // <= register routes into our app
  ],
  //want to outsource our routes(need to add AppRoutingModule to main app module):
  exports: [RouterModule]
})

export class AppRoutingModule {

}
