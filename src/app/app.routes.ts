import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { TripPageComponent } from './trip-page/trip-page.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'home', component: HomeComponent, canActivate:[AuthGuardService] },
    {path:'trip/:id',component:TripPageComponent, canActivate:[AuthGuardService]}
];
