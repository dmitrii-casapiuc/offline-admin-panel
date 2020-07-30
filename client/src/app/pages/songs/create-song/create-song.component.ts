import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { fadeInUp400ms } from '@animations/fade-in-up.animation'
import { Song } from '@interfaces/song.interface'

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

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      chordKey: new FormControl(null, Validators.required),
      text: new FormControl(null)
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

  getErrorMessageChordKey() {
    const {chordKey} = this.form.controls
    let message

    if (chordKey.hasError('required')) {
      message = 'You must enter chord key'
    }

    return message
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    /* this.loading = true
    this.submitted = true */

    const song: Song = {
      title: this.form.value.title,
      chordKey: this.form.value.chordKey,
      text: this.form.value.text,
      date: new Date()
    }

    console.log(song)
    

    /* this.auth.login(user).subscribe(() => {
      this.router.navigate(['/app', 'songs'])
      this.submitted = false
      this.loading = false
    }, () => {
      this.submitted = false
      this.loading = false
    }) */
  }
}
