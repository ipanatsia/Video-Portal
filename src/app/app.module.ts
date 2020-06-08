import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoComponent } from './main/video/video.component';
import { UpperBarComponent } from './upper-bar/upper-bar.component';
import { routes } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './services/authGuard'
import { VideoService } from './services/video.service';
import { StarRatingModule } from 'angular-star-rating';
import { BarRatingModule } from "ngx-bar-rating";
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    VideoComponent,
    UpperBarComponent,
    SignupComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    StarRatingModule.forRoot(),
    BarRatingModule
  ],
  providers: [AuthenticationService,AuthGuard,VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
