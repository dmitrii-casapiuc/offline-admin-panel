import { Component } from '@angular/core'
import { BreakpointObserver } from '@angular/cdk/layout'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {

  desktopQuery$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 1280px)')
    .pipe(
      map(result => result.matches)
    )

  constructor(private breakpointObserver: BreakpointObserver) {}
}
