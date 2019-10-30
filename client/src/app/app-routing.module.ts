import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesListComponent } from './components/games-list/games-list.component';
import { GameFormComponent } from './components/game-form/game-form.component';

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
