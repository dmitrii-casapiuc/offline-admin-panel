import { Component, Input } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'
import { Icon } from '@visurel/iconify-angular'
import roundQueueMusic from '@iconify/icons-ic/round-queue-music'

export interface SidenavMenuLinks {
  icon: Icon
  label: string
  route: string
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() mobileQuery: boolean

  iconMusic = roundQueueMusic
  items: SidenavMenuLinks[] = [
    {
      icon: roundQueueMusic,
      label: 'Songs',
      route: 'songs'
    }
  ]

  constructor(
    private sideNav: MatSidenav
  ) {}

  handlerItem() {
    if (this.mobileQuery) {
      this.sideNav.close()
    }
  }
}
