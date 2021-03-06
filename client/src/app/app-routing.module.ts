import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '@app/utils/auth.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('@app/pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: () => import('@app/layouts/main-layout/main-layout.module').then((m) => m.MainLayoutModule),
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
