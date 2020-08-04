import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Icon } from '@visurel/iconify-angular'
import icPerson from '@iconify/icons-ic/twotone-person'
import icAccountCircle from '@iconify/icons-ic/twotone-account-circle'
import icChevronRight from '@iconify/icons-ic/twotone-chevron-right'
import { AuthService } from '@app/services/auth.service'

export interface MenuItem {
  id: string
  icon: Icon
  label: string
  description: string
  colorClass: string
  route: string
}

@Component({
  selector: 'app-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss'],
})
export class ToolbarUserComponent implements OnInit {
  icPerson = icPerson
  icChevronRight = icChevronRight

  items: MenuItem[] = [
    {
      id: '1',
      icon: icAccountCircle,
      label: 'My Profile',
      description: 'Personal Information',
      colorClass: 'icon-profile',
      route: '/app/profile'
    }
  ]

  constructor(
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
