import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesListComponent } from './components/games-list/games-list.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { TableFiltroComponent } from './components/table-filtro/table-filtro.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/contenido',
    pathMatch: 'full'
  },
  {
    path: 'contenido',
    component: GamesListComponent
  },
  {
    path: 'contenido/reporte',
    component: TableFiltroComponent
  },
  {
    path: 'contenido/add',
    component: GameFormComponent
  },
  {
    path: 'contenido/edit/:id',
    component: GameFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
