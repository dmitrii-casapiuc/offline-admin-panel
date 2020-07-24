import { Component, Input } from '@angular/core'
import emojioneUS from '@iconify/icons-emojione/flag-for-flag-united-states'
import emojioneRU from '@iconify/icons-emojione/flag-for-russia'


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() mobileQuery: boolean
  @Input() drawer

  emojioneUS = emojioneUS
  emojioneRU = emojioneRU
}
