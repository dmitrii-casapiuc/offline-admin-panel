import { Component, OnInit, OnDestroy } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

import { fadeInUp400ms } from '@app/animations/fade-in-up.animation'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Chord } from '@app/interfaces/chord.interface'
import { defaultChords } from '@app/utils/chords'
import { SongService } from '@app/services/song.service'
import { Song } from '@app/interfaces/song.interface';
import { Subscription } from 'rxjs'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class EditSongComponent implements OnInit, OnDestroy {
  form: FormGroup
  submitted: boolean = false
  loadingButton: boolean = false
  isLoading: boolean = true
  idSong: string = ''
  eSub: Subscription
  gSub: Subscription

  chords: Chord[] = defaultChords

  constructor(
    private songService: SongService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idSong = this.activatedRoute.snapshot.params['id']

    this.gSub = this.songService.getById(this.idSong).subscribe(response => {
      const {
        title,
        tonality,
        lyrics
      } = response

      this.form = new FormGroup({
        title: new FormControl(title, Validators.required),
        tonality: new FormControl(tonality, Validators.required),
        lyrics: new FormControl(lyrics, Validators.required)
      })

      this.isLoading = false
    })
  }

  getErrorMessageTitle() {
    const {title} = this.form.controls
    let message

    if (title.hasError('required')) {
      message = 'You must enter title'
    }

    return message
  }

  getErrorMessageTonality() {
    const {tonality} = this.form.controls
    let message

    if (tonality.hasError('required')) {
      message = 'You must enter tonality'
    }

    return message
  }

  getErrorMessageLyrics() {
    const {lyrics} = this.form.controls
    let message

    if (lyrics.hasError('required')) {
      message = 'You must enter lyrics'
    }

    return message
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.loadingButton = true
    this.submitted = true

    const song: Song = {
      _id: this.idSong,
      title: this.form.value.title,
      tonality: this.form.value.tonality,
      lyrics: this.form.value.lyrics,
      date: new Date()
    }

    this.eSub = this.songService.update(song).subscribe(() => {
      this.snackBar.open('You have successfully updated', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 2000,
        panelClass: ['succes-snackbar']
      })

      this.submitted = false
      this.loadingButton = false
    }, () => {
      this.snackBar.open('Something went wrong. Try again', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 2000,
        panelClass: ['error-snackbar']
      })

      this.submitted = false
      this.loadingButton = false
    })
  }

  ngOnDestroy() {
    if (this.eSub) {
      this.eSub.unsubscribe()
    }

    if (this.gSub) {
      this.gSub.unsubscribe()
    }
  }
}
