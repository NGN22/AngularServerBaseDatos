import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { GamesService } from 'src/app/services/games.service';
/*importaciones para select*/
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Game } from 'src/app/models/Game';


@Component({
  selector: 'app-table-filtro',
  templateUrl: './table-filtro.component.html',
  styleUrls: ['./table-filtro.component.css']
})
export class TableFiltroComponent {


  extensiones = [
    { valor: 'mp3', muestraValor: 'mp3' },
    { valor: 'doc', muestraValor: 'doc' },
    { valor: 'jpg', muestraValor: 'jpg' },
    { valor: 'wav', muestraValor: 'wav' },
    { valor: 'mp4', muestraValor: 'mp4' },
  ];

  seleccionada = this.extensiones[0].valor;
  games: any = [];
  displayedColumns: string[] = ['id_contenido', 'titulo', 'extension', 'fec_publicacion', 'image'];
  dataSource // = new MatTableDataSource(this.games);
  pipe: DatePipe;
  values : any

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  

  get fromDate() { return this.filterForm.get('fromDate').value; }
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
              return new Date(data.fec_publicacion) >= this.fromDate && new Date(data.fec_publicacion) <= this.toDate;
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
// extension
  select(filterValue: string){
    this.dataSource.filterPredicate = 
    (data: Game, filter: string) => data.extension.indexOf(filter) != -1;
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onKey(event: any) { // without type info
    console.log("entrada",this.values)
    this.dataSource.filterPredicate = 
    (data: Game, filter: string) => data.titulo.toLowerCase().indexOf(filter) != -1;
    this.values = this.values.trim(); 
    this.values = this.values.toLowerCase();
    this.dataSource.filter = this.values;
  }

  puedoFiltrar(){
    return this.fromDate <= this.toDate
  }
 

}
