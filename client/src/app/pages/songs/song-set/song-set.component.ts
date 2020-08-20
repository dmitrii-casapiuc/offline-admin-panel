import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatDialog } from '@angular/material/dialog'
import { MatSort } from '@angular/material/sort'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'

import icEdit from '@iconify/icons-ic/twotone-edit'
import icDelete from '@iconify/icons-ic/twotone-delete'
import icSearch from '@iconify/icons-ic/twotone-search'
import icAdd from '@iconify/icons-ic/twotone-add'
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz'

import { SongSet } from '@app/interfaces/song-set.interface'
import { fadeInUp400ms } from '@app/animations/fade-in-up.animation'
import { SongSetCreateUpdateComponent } from './song-set-create-update/song-set-create-update.component'
import { SongSetService } from '@app/services/song-set.service'

@Component({
  selector: 'app-song-set',
  templateUrl: './song-set.component.html',
  styleUrls: ['./song-set.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class SongSetComponent implements OnInit {
  songSet: SongSet[] = []
  isLoading = true
  displayedColumns: string[] = ['number', 'title', 'status', 'actions']
  pageSize = 10
  pageSizeOptions: number[] = [5, 10, 20, 50]
  dataSource: MatTableDataSource<SongSet> | null
  searchCtrl = new FormControl()
  fetchSongSetSubscription$: Subscription
  deleteSongSetSubscription$: Subscription
  icEdit = icEdit
  icSearch = icSearch
  icDelete = icDelete
  icAdd = icAdd
  icMoreHoriz = icMoreHoriz

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort

  constructor(
    private router: Router,
    private songSetService: SongSetService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource()
    this.isLoading = true

    this.fetchSongSetSubscription$ = this.songSetService.fetch()
      .subscribe(
        response => {
          console.log(response)
          this.isLoading = false
          this.songSet = response
          this.dataSource.data = response
        }
      )

    this.searchCtrl.valueChanges.subscribe(value => this.onFilterChange(value))
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return
    }
    value = value.trim()
    value = value.toLowerCase()
    this.dataSource.filter = value
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  create(event: Event) {
    event.preventDefault()

    this.dialog.open(SongSetCreateUpdateComponent, {
      width: '400px'
    })
  }

  update(data: SongSet) {
    console.log(data)
  }

  delete(data: SongSet) {
    this.isLoading = true
    this.deleteSongSetSubscription$ = this.songSetService.remove(data._id)
      .subscribe(
        () => {
          const newSongs = this.songSet.filter(s => s._id !== data._id)
          this.songSet = newSongs
          this.dataSource.data = newSongs
          this.isLoading = false
        }
      )
  }

  ngOnDestroy() {
    this.fetchSongSetSubscription$.unsubscribe()
    this.deleteSongSetSubscription$.unsubscribe()
  }
}
