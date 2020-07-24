import { Component, OnInit } from '@angular/core';
import icPerson from '@iconify/icons-ic/twotone-person'

@Component({
  selector: 'app-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss'],
})
export class ToolbarUserComponent implements OnInit {
  icPerson = icPerson

  ngOnInit() {
  }
}
