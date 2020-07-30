import { NgModule } from '@angular/core'

import { ProfileComponent } from './profile.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [ProfileComponent],
  imports: [RouterModule.forChild([{ path: '', component: ProfileComponent }])]
})
export class ProfileModule {}
