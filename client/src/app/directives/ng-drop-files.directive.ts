import {
  Directive, EventEmitter, ElementRef,
  HostListener, Input, Output
} from '@angular/core';
import { FileItem } from '../models/fileItem';
import { GameFormComponent } from '../components/game-form/game-form.component';


@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input() archivo: FileItem
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();
  
  constructor(private carga: GameFormComponent) { }

  @HostListener('dragover', ['$event'])

  public onDragEnter(event: any) {
    console.log(event)
    this.mouseOver.emit(true);
    this._detenerApertura(event)
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    console.log(event)
    this.mouseOver.emit(false);
    this._detenerApertura(event)
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    console.log(event)
    const transferencia = this._getTransferencia(event)
    if (!transferencia) {
      return
    }
    else {
      this._extraesArchivos(transferencia.files)
      this._detenerApertura(event)
      this.mouseOver.emit(false)
    }
  }

  private _getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer
  }

  private _extraesArchivos(archivosLista: FileList) {
    this._detenerApertura(event)
    console.log(event)
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemporal = archivosLista[propiedad]
      if (this._puedeSerCargado(archivoTemporal)) {
        this.archivo = new FileItem(archivoTemporal)
        this.carga.archivo = this.archivo
      }
    }

  }
  /* */



  private _detenerApertura(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  private _puedeSerCargado(archivoTemporal: File): boolean {
    if (!this._validacionArchivoDrop(archivoTemporal.name) && this._indefinido(archivoTemporal.type)) {
      return true
    } else { return false }

  }

  private _indefinido(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : true
  }


  private _validacionArchivoDrop(nombreArchivo: string): boolean {
    if (this.archivo != null && nombreArchivo === this.archivo.nombreArchivo) {
      console.log('ya esta agregado')
      return true
    } else {
      console.log('falta agregar')
      return false
    }

  }
}
