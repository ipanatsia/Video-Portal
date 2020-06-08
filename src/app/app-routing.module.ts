import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './services/authGuard';
import { DetailsComponent } from './details/details.component';


export const routes: Routes = [
  { path:'login', component:LoginComponent},
  { path:'signup', component:SignupComponent},
  { path: '' , component: MainComponent, canActivate: [AuthGuard] },
  { path:'details', component: DetailsComponent, canActivate: [AuthGuard] }
];
