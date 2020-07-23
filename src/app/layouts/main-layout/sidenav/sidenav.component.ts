import { Component } from '@angular/core'
import { Icon } from '@visurel/iconify-angular'
import roundQueueMusic from '@iconify/icons-ic/round-queue-music'
import twotoneError from '@iconify/icons-ic/twotone-error'


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
  iconMusic = roundQueueMusic

  pages: SidenavMenuLinks[] = [
    {
      icon: roundQueueMusic,
      label: 'Songs',
      route: 'songs'
    },
    {
      icon: twotoneError,
      label: 'Error',
      route: 'error'
    },
  ]
}
