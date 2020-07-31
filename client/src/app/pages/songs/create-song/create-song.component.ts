import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'

import { fadeInUp400ms } from '@animations/fade-in-up.animation'
import { Song } from '@interfaces/song.interface'
import { SongService } from '@services/song.service'

interface Chord {
  name: string;
  value: string;
}

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class CreateSongComponent implements OnInit {
  form: FormGroup
  submitted = false
  loading = false

  chords: Chord[] = [
    { name: 'Ab', value: 'Ab' },
    { name: 'A', value: 'A' },
    { name: 'A#', value: 'A#' },
    { name: 'Bb', value: 'Bb' },
    { name: 'H', value: 'H' },
    { name: 'C', value: 'C' },
    { name: 'C#', value: 'C#' },
    { name: 'Db', value: 'Db' },
    { name: 'D', value: 'D' },
    { name: 'D#', value: 'D#' },
    { name: 'Eb', value: 'Eb' },
    { name: 'E', value: 'E' },
    { name: 'F', value: 'F' },
    { name: 'F#', value: 'F#' },
    { name: 'Gb', value: 'Gb' },
    { name: 'G', value: 'G' },
    { name: 'G#', value: 'G#' }
  ]

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
      lyrics: this.form.value.lyrics,
      date: new Date()
    }

    this.songService.create(song).subscribe(() => {
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
}
