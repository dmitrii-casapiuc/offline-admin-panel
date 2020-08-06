import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
// import {NavService} from '../nav.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { dropdownAnimation } from '@app/animations/dropdown.animation'

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
export class SidenavItemComponent {
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item
  @Input() depth: number;

  constructor(
              public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  onItemSelected(item) {
    if (!item.children || !item.children.length) {
      this.router.navigate(['/app', item.route]);
      // this.navService.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
