import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Observable, of, ReplaySubject } from 'rxjs'
import { filter } from 'rxjs/operators'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { FormControl } from '@angular/forms'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field'

import icEdit from '@iconify/icons-ic/twotone-edit'
import icDelete from '@iconify/icons-ic/twotone-delete'
import icSearch from '@iconify/icons-ic/twotone-search'
import icAdd from '@iconify/icons-ic/twotone-add'
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz'

import { Song } from './interfaces/song.model'
import { TableColumn } from './interfaces/table-column.interface'
import { fadeInUp400ms } from '../../animations/fade-in-up.animation'
import { stagger40ms } from '../../animations/stagger.animation'

const ELEMENT_DATA: Song[] = [
  {id: 1, name: 'Hydrogen'},
  {id: 2, name: 'Helium'},
  {id: 3, name: 'Lithium'},
  {id: 4, name: 'Beryllium'},
  {id: 5, name: 'Boron'},
  {id: 6, name: 'Carbon'},
  {id: 7, name: 'Nitrogen'},
  {id: 8, name: 'Oxygen'},
  {id: 9, name: 'Fluorine'},
  {id: 10, name: 'Neon'},
  {id: 11, name: 'Sodium'},
  {id: 12, name: 'Magnesium'},
  {id: 13, name: 'Aluminum'},
  {id: 14, name: 'Silicon'},
  {id: 15, name: 'Phosphorus'},
  {id: 16, name: 'Sulfur'},
  {id: 17, name: 'Chlorine'},
  {id: 18, name: 'Argon'},
  {id: 19, name: 'Potassium'},
  {id: 20, name: 'Calcium'},
];

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class SongsComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Song[]> = new ReplaySubject<Song[]>(1)
  data$: Observable<Song[]> = this.subject$.asObservable()
  songs: Song[]

  @Input()
  columns: TableColumn<Song>[] = [
    { label: 'Name', property: 'name', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ]
  pageSize = 10
  pageSizeOptions: number[] = [5, 10, 20, 50]
  dataSource: MatTableDataSource<Song> | null
  searchCtrl = new FormControl()

  icEdit = icEdit
  icSearch = icSearch
  icDelete = icDelete
  icAdd = icAdd
  icMoreHoriz = icMoreHoriz

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort

  constructor() {}

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property)
  }

  getData() {
    return of(ELEMENT_DATA.map(song => song))
  }

  ngOnInit() {
    this.getData().subscribe(songs => {
      this.subject$.next(songs)
    })

    this.dataSource = new MatTableDataSource()

    this.data$.pipe(
      filter<Song[]>(Boolean)
    ).subscribe(songs => {
      this.songs = songs
      this.dataSource.data = songs
    })

    /* this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value)); */
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  create() {
    console.log('create')
  }

  update(song: Song) {
    console.log(song, 'update')
  }

  delete(song: Song) {
    console.log(song, 'delete')
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property
  }

  ngOnDestroy() {
  }
}
