import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { map } from "rxjs/operators";
import { AppState } from './../app.reducer';
import { Usuario } from '../models/usuario.models';
import * as authActions from './../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userSubscription = this.firestore.doc(`${user.uid}/usuario`).valueChanges().subscribe((firetoreUser: any) => {
          const { email, nombre, uid } = firetoreUser;
          this.store.dispatch(authActions.setUser({ user: { email, nombre, uid } }))
        })
      } else {
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
      }
    })
  }

  crearUsurio(nombre: string, email: string, password: string) {

    return this.auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {

      const newUser = new Usuario(user.uid, nombre, user.email);
      console.log('***newUser', newUser, { ...newUser });
      return this.firestore.doc(`${user.uid}/usuario`).set({ ...newUser })
    });
  }

  loginUsuario(email: string, password: string): Promise<firebase.auth.UserCredential> {

    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }
}
