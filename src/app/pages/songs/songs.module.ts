import { NgModule } from '@angular/core'

import { SongsComponent } from './songs.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [SongsComponent],
  imports: [RouterModule.forChild([{ path: '', component: SongsComponent }])]
})
export class SongsModule {}
