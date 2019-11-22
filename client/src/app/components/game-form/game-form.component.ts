import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from 'src/app/models/Game';

import { GamesService } from 'src/app/services/games.service';
import { CargaServiceService } from 'src/app/services/cargaService.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileItem } from 'src/app/models/fileItem';
import { NgForm } from '@angular/forms';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') clases = 'row';
  archivo: FileItem;
  estaSobreDrop = false;

  game: Game = {
    id_contenido: 0,
    titulo: '',
    descripcion: '',
    fec_publicacion: new Date().toISOString().slice(0, 19).replace('T', ' '),
    extension: '',
    image: '',
  };

  extensiones =['mp3','doc','jpg', 'wav', 'mp4']
  imagenes = [{nombre: 'camara' , valor : '/assets/camara.png'},
  {nombre: 'reproductor' , valor : '/assets/reproductor.png'},
  {nombre: 'parlante' , valor : '/assets/parlante.jpg'},
  {nombre: 'auriculares' , valor : '/assets/auriculares.png'}]
  edit: boolean = false;

  constructor(private gameService: GamesService,
    public fileService: CargaServiceService,
    private router: Router, private activatedRoute: ActivatedRoute) { 
    }

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
    console.log('nuevo')
    this.uploadFile()
    // delete this.game.fec_publicacion;
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
    console.log("update")
    this.game.fec_publicacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.gameService.updateGame(this.game.id_contenido, this.game)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/contenido']);
        },
        err => console.error(err)
      )
  }

  uploadFile(){
    if(!this.edit){
      this.archivo.id = this.game.id_contenido as unknown as string
      this.fileService.cargarArchivo( this.archivo )
      this.archivo = null
    }
  }


  save(forma: NgForm): boolean{
    console.log(forma,forma.valid)
    if(this.edit){
      return (forma.valid)
    }
    else
    return this.archivo && (forma.valid)
  }

  
}
