import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'

import { fadeInUp400ms } from '@app/animations/fade-in-up.animation'
import { Song } from '@app/interfaces/song.interface'
import { SongService } from '@app/services/song.service'
import { Chord } from '@app/interfaces/chord.interface'
import { defaultChords } from '@app/utils/chords';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class CreateSongComponent implements OnInit, OnDestroy {
  form: FormGroup
  submitted = false
  loading = false
  cSub: Subscription

  chords: Chord[] = defaultChords

  constructor(
    private songService: SongService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      tonality: new FormControl(null, Validators.required),
      lyrics: new FormControl(null, Validators.required)
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

    this.loading = true
    this.submitted = true

    const song: Song = {
      title: this.form.value.title,
      tonality: this.form.value.tonality,
      lyrics: this.form.value.lyrics
    }

    this.cSub = this.songService.create(song).subscribe(() => {
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

      this.submitted = false
      this.loading = false
    }, () => {
      this.snackBar.open('Something went wrong. Try again', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 2000,
        panelClass: ['error-snackbar']
      })

      this.submitted = false
      this.loading = false
    })
  }

  ngOnDestroy() {
    if (this.cSub) {
      this.cSub.unsubscribe()
    }
  }
}
