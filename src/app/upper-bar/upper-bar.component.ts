import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upper-bar',
  templateUrl: './upper-bar.component.html',
  styleUrls: ['./upper-bar.component.css']
})
export class UpperBarComponent implements OnInit,OnDestroy {

  private authListenerSub:Subscription;
  userIsAuth:Boolean;

  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.userIsAuth = this.auth.getIsAuth();
    this.authListenerSub = this.auth.getAuthStatus().subscribe(data=>{
      this.userIsAuth = data;
    });
  }

  ngOnDestroy(): void {
    this.authListenerSub.unsubscribe();
  }

  onLogout() {
    this.auth.logout();
  }

}
