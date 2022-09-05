import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { BricoleurComponent } from '../../bricoleur/bricoleur.component';
import { MapsComponent } from '../../maps/maps.component';
import { ClientComponent } from 'app/client/client.component';
import { CategoriesComponent } from 'app/categories/categories.component';
import { MissionsComponent } from 'app/missions/missions.component';
import { LoginBricoComponent } from 'app/pages/login-brico/login-brico.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'bricoleur',   component: BricoleurComponent },
    { path: 'client',     component: ClientComponent },
    { path: 'categorie',     component: CategoriesComponent },
    { path: 'mission',          component: MissionsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'login',           component: LoginBricoComponent },

];
