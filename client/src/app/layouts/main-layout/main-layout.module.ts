import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { IconModule } from '@visurel/iconify-angular'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MdePopoverModule } from '@material-extended/mde'

import { MaterialModule } from '@app/material.module'
import { SongService } from '@app/services/song.service'
import { MainLayoutRoutingModule } from './main-layout-routing.module'
import { MainLayoutComponent } from './main-layout.component'
import { SidenavComponent } from './sidenav/sidenav.component'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { ToolbarUserComponent } from './toolbar/toolbar-user/toolbar-user.component'

@NgModule({
  declarations: [
    MainLayoutComponent,
    SidenavComponent,
    ToolbarComponent,
    ToolbarUserComponent
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    MaterialModule,
    IconModule,
    FlexLayoutModule,
    MdePopoverModule
  ],
  exports: [RouterModule],
  providers: [SongService]
})
export class MainLayoutModule {}
