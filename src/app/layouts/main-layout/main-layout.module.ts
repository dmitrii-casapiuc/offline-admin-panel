import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { MaterialModule } from '@app/material.module'
import { MainLayoutRoutingModule } from './main-layout-routing.module'
import { MainLayoutComponent } from './main-layout.component'
import { SidenavComponent } from './sidenav/sidenav.component'
import { ToolbarComponent } from './toolbar/toolbar.component'

@NgModule({
  declarations: [
    MainLayoutComponent,
    SidenavComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    MaterialModule
  ],
  exports: [RouterModule]
})
export class MainLayoutModule {}
