import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from './auth.service';
import { IngresoEgreso } from './../models/ingresoEgreso.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid;
    const {descripcion,monto,tipo} = ingresoEgreso;
    return this.firestore.doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({ descripcion,monto,tipo });
  }

  initIngresoEgresoListener(uid: string) {
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        })))
      )
  }
  borrarIngresoEgreso(uidItem: string): Promise<void> {
    const uid = this.authService.user.uid;
    return this.firestore.doc(`${ uid }/ingresos-egresos/items/${ uidItem }`).delete();
  }
}
