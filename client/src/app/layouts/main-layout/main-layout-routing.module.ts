import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainLayoutComponent } from './main-layout.component'

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'songs',
        loadChildren: () => import('@app/pages/songs/songs.module').then(m => m.SongsModule),
      },
      {
        path: 'error',
        loadChildren: () => import('@app/pages/errors/error-404/error-404.module').then((m) => m.Error404Module)
      },
      {
        path: 'profile',
        loadChildren: () => import('@app/pages/profile/profile.module').then((m) => m.ProfileModule)
      },
      {
        path: '**',
        loadChildren: () => import('@app/pages/errors/error-404/error-404.module').then((m) => m.Error404Module)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule {}
