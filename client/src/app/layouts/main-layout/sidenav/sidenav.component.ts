import { Component } from '@angular/core'
import roundQueueMusic from '@iconify/icons-ic/round-queue-music'
import { SidenavMenuLinks } from '@app/interfaces/sidenav-menu.interface'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
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
          label: 'List Songs',
          route: 'app/songs',
          level: 1
        },
        {
          label: 'Song Set',
          route: 'app/songs/set',
          level: 1
        },
      ]
    }
  ]
}
