import { Routes } from '@angular/router';

import { AcessoComponent } from './acesso/acesso.component';
import { HomeComponent } from './home/home.component';

import { AuthGuardService } from './auth-guard.service';

export const ROUTES: Routes = [
    { path: '', component: AcessoComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
]