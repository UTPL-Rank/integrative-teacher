import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import firebase from 'firebase';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public user!: firebase.User | null;

  constructor(
    private readonly auth: UserService,
  ) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(
      user => this.user = user
    );
  }

  signOut(): void{
    this.auth.signOut(['/']).then();
  }

}
