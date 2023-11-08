import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { canActivateAuthGuard, canActivateChildAuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';

const routes: Routes = [
  {
    path: 'crisis-list',
    component: CrisisListComponent,
  },
  {
    path: 'heroes-list',
    component: HeroesListComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [canActivateAuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [canActivateAuthGuard],
    canActivateChild: [canActivateChildAuthGuard],
    children: [
      { path: 'child-1', component: Child1Component },
      { path: 'child-2', component: Child2Component },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
