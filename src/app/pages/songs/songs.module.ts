import { NgModule } from '@angular/core'

import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { IconModule } from '@visurel/iconify-angular'
import { FlexLayoutModule } from '@angular/flex-layout'

import { MaterialModule } from '@app/material.module'
import { SongsComponent } from './songs.component'
import { ReactiveFormsModule } from '@angular/forms';
import { CreateSongComponent } from './create-song/create-song.component'

@NgModule({
  declarations: [
    SongsComponent,
    CreateSongComponent
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
      }
    ])
  ]
})
export class SongsModule {}
