import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('@pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'app',
    loadChildren: () => import('@layouts/main-layout/main-layout.module').then((m) => m.MainLayoutModule),
  },
  {
    path: 'error',
    loadChildren: () => import('@pages/errors/error-404/error-404.module').then((m) => m.Error404Module),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
