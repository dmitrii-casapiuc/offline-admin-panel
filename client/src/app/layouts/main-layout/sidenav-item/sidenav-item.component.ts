import {Component, HostBinding, Input, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {animate, state, style, transition, trigger} from '@angular/animations'
import { BreakpointObserver } from '@angular/cdk/layout'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { MatSidenav } from '@angular/material/sidenav'

@Component({
  selector: 'app-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SidenavItemComponent implements OnInit {
  expanded: boolean
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded
  @Input() item
  @Input() depth: number

  desktopQuery: Observable<boolean> = this.breakpointObserver.observe('(max-width: 1280px)')
    .pipe(
      map(result => result.matches)
    )

  constructor(
    public router: Router,
    private sideNav: MatSidenav,
    private breakpointObserver: BreakpointObserver
  ) {
    if (this.depth === undefined) {
      this.depth = 0
    }
  }

  ngOnInit() {
    if (this.router.isActive(this.router.url, true)) {
      this.expanded = true
    }
  }

  onItemSelected(item) {
    if (!item.children || !item.children.length) {
      const data = item.route.split('/')
      const link = ['/', ...data]

      /* if (this.desktopQuery) {
        this.sideNav.close()
      } */

      console.log(this.desktopQuery)

      this.router.navigate(link)
    }

    if (item.children && item.children.length) {
      this.expanded = !this.expanded
    }
  }
}
