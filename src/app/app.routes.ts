import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { HomeComponent } from './pages/home/home.component';
import { TripPageComponent } from './pages/trip-page/trip-page.component';
import { AuthGuardService } from './services/Auth/auth-guard.service';
import { LandingComponent } from './pages/landing/landing.component';
import { TripPageNoAuthComponent } from './pages/trip-page-no-auth/trip-page-no-auth.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'auth', component: AuthPageComponent },
    { path: 'home', component: HomeComponent, canActivate:[AuthGuardService] },
    {path:'trip/:id',component:TripPageComponent, canActivate:[AuthGuardService]},
    {path:'tripitinerary/:id',component:TripPageNoAuthComponent}
];
