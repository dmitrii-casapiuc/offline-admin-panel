import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { MainLayoutComponent } from './main-layout.component'

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      /* {path: '', redirectTo: '/app/songs', pathMatch: 'full'}, */
      /* {path: 'songs', component: SongsComponent}, */
      {
        path: 'songs',
        loadChildren: () => import('@pages/songs/songs.module').then((m) => m.SongsModule),
      }
    ]
  }
]

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MainLayoutModule {}
