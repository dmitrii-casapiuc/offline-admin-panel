import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { fadeInUp400ms } from '@animations/fade-in-up.animation'
import { AuthService } from '@services/auth.service'
import { User } from '@interfaces/user.interface'

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

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
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

    if (this.form.controls.email.hasError('required')) {
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
