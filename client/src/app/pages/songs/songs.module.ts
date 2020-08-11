import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { IconModule } from '@visurel/iconify-angular'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search'

import { MaterialModule } from '@app/material.module'
import { SpinnerComponent } from '@app/components/spinner/spinner.component'
import { SongsComponent } from './songs.component'
import { CreateSongComponent } from './create-song/create-song.component'
import { EditSongComponent } from './edit-song/edit-song.component';
import { SetSongsComponent } from './set-songs/set-songs.component';
import { SetSongsCreateUpdateComponent } from './set-songs/set-songs-create-update/set-songs-create-update.component'

@NgModule({
  declarations: [
    SongsComponent,
    CreateSongComponent,
    EditSongComponent,
    SpinnerComponent,
    SetSongsComponent,
    SetSongsCreateUpdateComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    IconModule,
    FlexLayoutModule,
    NgxMatSelectSearchModule,
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
        path: 'set-songs',
        component: SetSongsComponent
      },
      {
        path: ':id',
        component: EditSongComponent
      }
    ])
  ]
})
export class SongsModule {}
