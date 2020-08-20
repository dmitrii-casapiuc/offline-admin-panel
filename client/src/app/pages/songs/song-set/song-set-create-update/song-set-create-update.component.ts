import { Component, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import icClose from '@iconify/icons-ic/twotone-close'
import { MatSelect } from '@angular/material/select'
import { takeUntil } from 'rxjs/operators'
import { ReplaySubject, Subject, Subscription } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import _ from 'lodash'

import { SongService } from '@app/services/song.service'
import { SongSetService } from '@app/services/song-set.service'
import { SongSet } from '@app/interfaces/song-set.interface'

interface Song {
  _id?: string
  title: string
}

@Component({
  selector: 'app-song-set-create-update',
  templateUrl: './song-set-create-update.component.html',
  styleUrls: ['./song-set-create-update.component.scss']
})
export class SongSetCreateUpdateComponent implements OnInit {
  form: FormGroup
  mode: 'create' | 'update' = 'create'
  isLoading = true
  loadingButton = false
  icClose = icClose
  songMultiFilter: FormControl = new FormControl()
  filteredSongsMulti: ReplaySubject<Song[]> = new ReplaySubject<Song[]>(1)
  _onDestroy = new Subject<void>()
  fetchSongsSubscription$: Subscription
  createSongSetSubscription$: Subscription
  
  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect

  songs: Song[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<SongSetCreateUpdateComponent>,
    private fb: FormBuilder,
    private songService: SongService,
    private songSetService: SongSetService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update'
    } else {
      // this.defaults = {} as Customer;
      this.defaults = {}
    }

    this.form = this.fb.group({
      title: new FormControl('', Validators.required),
      songIds: new FormControl([], Validators.required),
      status: new FormControl(false)
    })

    this.fetchSongsSubscription$ = this.songService.fetch()
      .subscribe(
        response => {
          this.songs = response

          // set initial selection
          // this.songIds.setValue([this.songs[0]])

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

  getErrorMessageTitle() {
    const {title} = this.form.controls
    let message

    if (title.hasError('required')) {
      message = 'You must enter title'
    }

    return message
  }

  getErrorMessageSongs() {
    const {songIds} = this.form.controls
    let message

    if (songIds.hasError('required')) {
      message = 'You must select songs'
    }

    return message
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
      this.createSongSet()
    } else if (this.mode === 'update') {
      this.updateSongSet()
    }
  }

  createSongSet() {
    this.loadingButton = true

    const songSet: SongSet = {
      title: this.form.value.title,
      songIds: _.toArray(_.mapValues(this.form.value.songIds, '_id')),
      status: this.form.value.status,
      date: new Date()
    }

    this.createSongSetSubscription$ = this.songSetService.create(songSet).subscribe(() => {
      this.snackBar.open('You have successfully created', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 2000,
        panelClass: ['succes-snackbar']
      })

      this.form.reset()
      
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].setErrors(null)
      })

      this.loadingButton = false
      this.dialogRef.close()
    }, () => {
      this.snackBar.open('Something went wrong. Try again', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 2000,
        panelClass: ['error-snackbar']
      })

      this.loadingButton = false
      this.dialogRef.close()
    })
  }

  updateSongSet() {
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
    this.fetchSongsSubscription$.unsubscribe()
  }
}
