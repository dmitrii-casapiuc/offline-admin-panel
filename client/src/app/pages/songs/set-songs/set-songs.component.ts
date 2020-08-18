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

import { Song } from '@app/interfaces/song.interface'
import { SetSongs } from '@app/interfaces/set-songs.interface'
import { fadeInUp400ms } from '@app/animations/fade-in-up.animation'
import { SongService } from '@app/services/song.service'
import { SetSongsCreateUpdateComponent } from './set-songs-create-update/set-songs-create-update.component'

@Component({
  selector: 'app-set-songs',
  templateUrl: './set-songs.component.html',
  styleUrls: ['./set-songs.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class SetSongsComponent implements OnInit {
  setSongs: SetSongs[] = []
  isLoading = true
  displayedColumns: string[] = ['number', 'title', 'actions']
  pageSize = 10
  pageSizeOptions: number[] = [5, 10, 20, 50]
  dataSource: MatTableDataSource<Song> | null
  searchCtrl = new FormControl()
  fSub: Subscription
  dSub: Subscription
  icEdit = icEdit
  icSearch = icSearch
  icDelete = icDelete
  icAdd = icAdd
  icMoreHoriz = icMoreHoriz

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort

  constructor(
    private router: Router,
    private songService: SongService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource()

    this.isLoading = false

    /* this.fSub = this.songService.fetch()
      .subscribe(
        response => {
          this.isLoading = false
          this.songs = response
          this.dataSource.data = response
        }
      )

    this.searchCtrl.valueChanges.subscribe(value => this.onFilterChange(value)) */
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

    this.dialog.open(SetSongsCreateUpdateComponent, {
      width: '400px'
    })
  }

  update(song: Song) {
    // this.router.navigate(['/app', 'songs', song._id])
  }

  delete(song: Song) {
    /* this.isLoading = true
    this.dSub = this.songService.remove(song._id)
      .subscribe(
        () => {
          const newSongs = this.songs.filter(s => s._id !== song._id)
          this.songs = newSongs
          this.dataSource.data = newSongs
          this.isLoading = false
        }
      ) */
  }

  ngOnDestroy() {
    if (this.fSub) {
      this.fSub.unsubscribe()
    }

    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }
}
