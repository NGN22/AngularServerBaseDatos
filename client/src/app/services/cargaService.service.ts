import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import { FileItem } from '../models/fileItem';

@Injectable({
  providedIn: 'root'
})
export class CargaServiceService {

  private CARPETA_DATOS = 'datos'
  constructor(private dataBase: AngularFirestore) { }

  private guardarArchivo(dato: { nombre: string, url: string }) {
    this.dataBase.collection(`/${this.CARPETA_DATOS}`)
      .add(dato)
  }

  cargarArchivo(datos: FileItem) {
    console.log(datos)
    const storageRef = firebase.storage().ref()
    datos.estaSubiendo = true

    const uploadTask: firebase.storage.UploadTask =
      storageRef.child(`${this.CARPETA_DATOS}/${datos.nombreArchivo}`)
        .put(datos.archivo)
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) => datos.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      (error) => console.error('error al subir', error),
      () => {
        console.log('Archivo cargado correctamente');
        datos.url = uploadTask.snapshot.downloadURL;
        datos.estaSubiendo = false;
        this.guardarArchivo({
          nombre: datos.nombreArchivo,
          url: datos.url
        });
      });
  }

}
