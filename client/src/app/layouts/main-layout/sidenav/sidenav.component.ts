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
          label: 'Create Song',
          route: 'app/songs/create',
          level: 1
        },
        {
          label: 'List Songs',
          route: 'app/songs',
          level: 1
        },
        /* {
          label: 'Set Songs',
          route: 'app/songs/set-songs',
          level: 1
        }, */
      ]
    }
  ]
}
