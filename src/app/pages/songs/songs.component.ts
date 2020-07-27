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

import { Customer } from './interfaces/customer.model'
import { TableColumn } from './interfaces/table-column.interface'
import { aioTableData } from './static-data/aio-table-data'
import { fadeInUp400ms } from '../../animations/fade-in-up.animation'
import { stagger40ms } from '../../animations/stagger.animation'

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
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1)
  data$: Observable<Customer[]> = this.subject$.asObservable()
  customers: Customer[]

  @Input()
  columns: TableColumn<Customer>[] = [
    { label: 'Name', property: 'name', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ]
  pageSize = 10
  pageSizeOptions: number[] = [5, 10, 20, 50]
  dataSource: MatTableDataSource<Customer> | null
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
    return of(aioTableData.map(customer => new Customer(customer)))
  }

  ngOnInit() {
    this.getData().subscribe(customers => {
      this.subject$.next(customers)
    })

    this.dataSource = new MatTableDataSource()

    this.data$.pipe(
      filter<Customer[]>(Boolean)
    ).subscribe(customers => {
      this.customers = customers
      this.dataSource.data = customers
    })

    /* this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value)); */
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  createCustomer() {
    console.log('create')
  }

  updateCustomer(customer: Customer) {
    console.log('update')
  }

  deleteCustomer(customer: Customer) {
    console.log('delete')
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property
  }

  ngOnDestroy() {
  }
}
