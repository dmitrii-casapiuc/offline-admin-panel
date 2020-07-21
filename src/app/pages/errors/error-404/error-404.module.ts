import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'

import { Error404RoutingModule } from './error-404-routing.module'
import { Error404Component } from './error-404.component'

@NgModule({
  declarations: [Error404Component],
  imports: [
    CommonModule,
    Error404RoutingModule,
    FlexLayoutModule
  ]
})
export class Error404Module {}
