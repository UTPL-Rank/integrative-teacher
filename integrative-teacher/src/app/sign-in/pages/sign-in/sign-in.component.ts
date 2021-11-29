import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MicrosoftSignInService } from 'src/app/core/services/microsoft-sign-in.service';
import { MicrosoftSignInOptions } from 'src/app/models/microsoft-sign-in-options.model';
import { SignIn } from 'src/app/models/sign-in.model';
import { } from '../../../models/sign-in.model';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [
    {
      provide: SignIn,
      useClass: MicrosoftSignInService
    }
  ]
})
export class SignInComponent implements OnInit {

  formLogin = new FormGroup({
    user: new FormControl('')
  });
  constructor(
    private router: Router,
    private readonly fb: FormBuilder,
    private readonly microsoftSignIn: SignIn<MicrosoftSignInOptions>
  ) { }

  public readonly signInForm: FormGroup = this.fb.group({
    username: [null, [Validators.required]]
  });

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    const { invalid, value } = this.signInForm;
    this.signInForm.markAsTouched();

    if (invalid) {
      return;
    }

    const username = value.username as string;
    console.log(username);
    await this.microsoftSignIn.signIn({ username }).then();
  }

  // tslint:disable-next-line: typedef
  get usernameControl() {
    return this.signInForm.controls.username;
  }

  goHome(): void {
    this.router.navigate(['/']).then();
  }
}
