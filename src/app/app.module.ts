import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './pages/home.component';
import { DemandeClientComponent } from './pages/demande-client/demande-client.component';
import { InscriptionBricoComponent } from './pages/inscription-brico/inscription-brico.component';
import { LoginBricoComponent } from './pages/login-brico/login-brico.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { NavBar2Component } from './pages/nav-bar/nav-bar2.component';
import { DashboardBricoComponent } from './pages/dashboard-brico/dashboard-brico.component';
import { FooterAppComponent } from './pages/footer/footer-app.component';
import { Header2Component } from './pages/header2/header2.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    DemandeClientComponent,
    InscriptionBricoComponent,
    LoginBricoComponent,
    AdminLayoutComponent,
    NavBar2Component,
    DashboardBricoComponent,
    FooterAppComponent,
    Header2Component
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
