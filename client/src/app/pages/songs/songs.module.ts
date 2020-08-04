import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { IconModule } from '@visurel/iconify-angular'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'

import { MaterialModule } from '@app/material.module'
import { SpinnerComponent } from '@app/components/spinner/spinner.component'
import { SongsComponent } from './songs.component'
import { CreateSongComponent } from './create-song/create-song.component'
import { EditSongComponent } from './edit-song/edit-song.component'

@NgModule({
  declarations: [
    SongsComponent,
    CreateSongComponent,
    EditSongComponent,
    SpinnerComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    IconModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {
        path: '',
        component: SongsComponent,
      },
      {
        path: 'create',
        component: CreateSongComponent
      },
      {
        path: ':id',
        component: EditSongComponent
      }
    ])
  ]
})
export class SongsModule {}
