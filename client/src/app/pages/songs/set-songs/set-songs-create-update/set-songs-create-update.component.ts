import { Component, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import icClose from '@iconify/icons-ic/twotone-close'
import { MatSelect } from '@angular/material/select'
import { takeUntil, take } from 'rxjs/operators'
import { ReplaySubject, Subject, Subscription } from 'rxjs'

import { SongService } from '@app/services/song.service'

interface Song {
  _id?: string
  title: string
}

@Component({
  selector: 'app-set-songs-create-update',
  templateUrl: './set-songs-create-update.component.html',
  styleUrls: ['./set-songs-create-update.component.scss']
})
export class SetSongsCreateUpdateComponent implements OnInit {
  form: FormGroup
  mode: 'create' | 'update' = 'create'
  isLoading = true
  icClose = icClose
  songMulti: FormControl = new FormControl()
  songMultiFilter: FormControl = new FormControl()
  filteredSongsMulti: ReplaySubject<Song[]> = new ReplaySubject<Song[]>(1)
  _onDestroy = new Subject<void>()
  fSub: Subscription
  
  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect

  songs: Song[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<SetSongsCreateUpdateComponent>,
    private fb: FormBuilder,
    private songService: SongService,
  ) {}

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update'
    } else {
      // this.defaults = {} as Customer;
      this.defaults = {}
    }

    this.form = this.fb.group({
      title: [this.defaults.title || '']
    })

    this.fSub = this.songService.fetch()
      .subscribe(
        response => {
          this.songs = response

          // set initial selection
          this.songMulti.setValue([this.songs[0]])

          // load the initial song list
          this.filteredSongsMulti.next(this.songs.slice())

          // listen for search field value changes
          this.songMultiFilter.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
              this.filterSongsMulti()
            })

          this.isLoading = false
        }
      )
  }

  filterSongsMulti() {
    if (!this.songs) {
      return
    }

    // get the search keyword
    let search = this.songMultiFilter.value
    if (!search) {
      this.filteredSongsMulti.next(this.songs.slice())
      return
    } else {
      search = search.toLowerCase()
    }

    // filter the songs
    this.filteredSongsMulti.next(
      this.songs.filter(song => song.title.toLowerCase().indexOf(search) > -1)
    )
  }

  save() {
    if (this.mode === 'create') {
      this.createSetSongs()
    } else if (this.mode === 'update') {
      this.updateSetSongs()
    }
  }

  createSetSongs() {
    const data = this.form.value
    this.dialogRef.close(data)
  }

  updateSetSongs() {
    const data = this.form.value
    data.id = this.defaults.id

    this.dialogRef.close(data)
  }

  isCreateMode() {
    return this.mode === 'create'
  }

  isUpdateMode() {
    return this.mode === 'update'
  }

  ngOnDestroy() {
    this._onDestroy.next()
    this._onDestroy.complete()

    if (this.fSub) {
      this.fSub.unsubscribe()
    }
  }
}
