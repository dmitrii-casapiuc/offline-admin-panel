import { Component } from '@angular/core'
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
  iconMusic = roundQueueMusic

  items: SidenavMenuLinks[] = [
    {
      icon: roundQueueMusic,
      label: 'Songs',
      route: 'songs'
    }
  ]
}
