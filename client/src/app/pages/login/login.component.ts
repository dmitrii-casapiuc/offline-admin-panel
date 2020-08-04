import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

import { fadeInUp400ms } from '@app/animations/fade-in-up.animation'
import { AuthService } from '@app/services/auth.service'
import { User } from '@app/interfaces/user.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {
  form: FormGroup
  submitted = false
  loading = false
  errorMessage: string

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.errorMessage = 'Log in to get started'
      } else if (params['authFailed']) {
        this.errorMessage = 'Session timed out'
      }

      if (this.errorMessage) {
        this.snackBar.open(this.errorMessage, 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 2000,
          panelClass: ['error-snackbar']
        })
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  getErrorMessageEmail() {
    const {email} = this.form.controls
    let message

    if (email.hasError('required')) {
      message = 'You must enter email'
    }

    if (email.hasError('email')) {
      message = 'Not a valid email'
    }

    return message
  }

  getErrorMessagePassword() {
    const {password} = this.form.controls
    let message

    if (password.hasError('required')) {
      message = 'You must enter password'
    }

    if (password.hasError('minlength')) {
      message = `Password must be ${password.errors.minlength.requiredLength} or more. Now is ${password.errors.minlength.actualLength}`
    }

    return message
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.loading = true
    this.submitted = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.router.navigate(['/app', 'songs'])
      this.submitted = false
      this.loading = false
    }, () => {
      this.submitted = false
      this.loading = false
    })
  }
}
