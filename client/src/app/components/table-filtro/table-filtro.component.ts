import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import { GamesService } from 'src/app/services/games.service';


@Component({
  selector: 'app-table-filtro',
  templateUrl: './table-filtro.component.html',
  styleUrls: ['./table-filtro.component.css']
})

export class TableFiltroComponent {
  games: any = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'created_at', 'image'];
  dataSource // = new MatTableDataSource(this.games);
  pipe: DatePipe;

filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
});

get fromDate() { console.log() ;
  return this.filterForm.get('fromDate').value; }
get toDate() { return this.filterForm.get('toDate').value; }

  constructor(private gameService: GamesService) {
    this.getContenidos();
  }

  getContenidos() {
    this.gameService.getGames()
      .subscribe(
        res => {
          this.games = res;
          this.dataSource = new MatTableDataSource(this.games);
          this.pipe = new DatePipe('en');
          this.dataSource.filterPredicate = (data, filter) => {
            if (this.fromDate && this.toDate) {
              return new Date(data.created_at) >= this.fromDate && new Date(data.created_at) <= this.toDate;
            }
            return true;
          };
        },
        err => console.error(err)
      );
  }

  applyFilter() {
    this.dataSource.filter = '' + Math.random();
  }
}
