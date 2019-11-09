import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from 'src/app/models/Game';

import { GamesService } from 'src/app/services/games.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  game: Game = {
    id_contenido: 0,
    titulo: '',
    extension: '',
    image: '',
    fec_publicacion: new Date()
  };

  edit: boolean = false;

  constructor(private gameService: GamesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.gameService.getGame(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.game = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  saveNewGame() {
    delete this.game.fec_publicacion;
    delete this.game.id_contenido;
    if (this.game.image === '') {
      this.game.image = '/assets/noimage.png';
    }
    this.gameService.saveGame(this.game)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/contenido']);
        },
        err => console.error(err)
      )
  }

  updateGame() {
    delete this.game.fec_publicacion;
    this.gameService.updateGame(this.game.id_contenido, this.game)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/contenido']);
        },
        err => console.error(err)
      )
  }

}
