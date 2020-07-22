import { Component } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {

  desktopQuery$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    )

  constructor(private breakpointObserver: BreakpointObserver) {}

}
