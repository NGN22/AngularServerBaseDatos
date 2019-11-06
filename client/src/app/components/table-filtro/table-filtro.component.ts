import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  DOB: Date;
  created: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, DOB: new Date(2016, 11, 24), created: new Date(2015, 15, 24) },
  { position: 2, name: 'Helium', weight: 4.0026, DOB: new Date(2018, 18, 24), created: new Date(2018, 11, 24) },
  { position: 3, name: 'Lithium', weight: 6.941, DOB: new Date(1993, 6, 12), created: new Date(1999, 12, 15) },
  { position: 4, name: 'Beryllium', weight: 9.0122, DOB: new Date(2001, 7, 6), created: new Date(2011, 10, 6) },
  { position: 5, name: 'Boron', weight: 10.811, DOB: new Date(2020, 5, 9), created: new Date(2020, 5, 9) },
  { position: 6, name: 'Carbon', weight: 12.0107, DOB: new Date(2008, 7, 14), created: new Date(2008, 7, 14) },
  { position: 7, name: 'Nitrogen', weight: 14.0067, DOB: new Date(1998, 11, 18), created: new Date(1998, 11, 18) },
  { position: 8, name: 'Oxygen', weight: 15.9994, DOB: new Date(2002, 2, 24), created: new Date(2002, 2, 24) },
  { position: 9, name: 'Fluorine', weight: 18.9984, DOB: new Date(2006, 4, 29), created: new Date(2006, 4, 29) },
  { position: 10, name: 'Neon', weight: 20.1797, DOB: new Date(2040, 5, 30), created: new Date(2040, 5, 30) },
];

@Component({
  selector: 'app-table-filtro',
  templateUrl: './table-filtro.component.html',
  styleUrls: ['./table-filtro.component.css']
})

export class TableFiltroComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'DOB', 'founded'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  pipe: DatePipe;

filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
});

get fromDate() { return this.filterForm.get('fromDate').value; }
get toDate() { return this.filterForm.get('toDate').value; }

  constructor() {
    this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.fromDate && this.toDate) {
        return data.created >= this.fromDate && data.created <= this.toDate;
      }
      return true;
    }
  }

  applyFilter() {
    this.dataSource.filter = '' + Math.random();
  }
}
