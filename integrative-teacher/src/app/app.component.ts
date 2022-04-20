import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'integrative-teacher';
}

// TODO: Guard for sign in user, administrator and teacher
