import { Component, Input } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'
import icAdd from '@iconify/icons-ic/twotone-add'
import roundQueueMusic from '@iconify/icons-ic/round-queue-music'
import { SidenavMenuLinks } from '@app/interfaces/sidenav-menu.interface'

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
      route: 'songs',
      level: 0,
    }
  ]

  navItems: SidenavMenuLinks[] = [
    {
      label: 'Songs',
      icon: roundQueueMusic,
      level: 0,
      children: [
        {
          label: 'List',
          route: 'songs',
          level: 1
        },
        {
          label: 'Set',
          route: 'songs',
          level: 1
        },
      ]
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
