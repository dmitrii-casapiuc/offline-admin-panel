import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { MainLayoutComponent } from './main-layout.component'
import { MainLayoutRoutingModule } from './main-layout-routing.module'

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    MainLayoutRoutingModule
  ],
  exports: [RouterModule]
})
export class MainLayoutModule {}
