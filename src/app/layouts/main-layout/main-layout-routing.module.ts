import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { MainLayoutComponent } from './main-layout.component'

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'songs',
        loadChildren: () => import('@pages/songs/songs.module').then((m) => m.SongsModule),
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule {}
