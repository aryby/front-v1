import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './pages/home.component';
import { LoginBricoComponent } from './pages/login-brico/login-brico.component';
import { InscriptionBricoComponent } from './pages/inscription-brico/inscription-brico.component';
import { DemandeClientComponent } from './pages/demande-client/demande-client.component';
import { DashboardBricoComponent } from './pages/dashboard-brico/dashboard-brico.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
  , {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginBricoComponent
  }
  ,
  {
    path: 'demande-client',
    component: DemandeClientComponent
  }
  ,{
    path:'inscription',
    component: InscriptionBricoComponent
  }
  ,{
    path:'dashboard-brico/:id',
    component: DashboardBricoComponent
  }
  , {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  }

  

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
