import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MaterialModule } from '@app/material.module'
import { LoginComponent } from './login.component'

@NgModule({
  declarations: [LoginComponent],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: LoginComponent, pathMatch: 'full' }])
  ],
})
export class LoginModule {}
