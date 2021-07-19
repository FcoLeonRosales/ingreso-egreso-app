import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { Usuario } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(user => {
      console.log(user);
      console.log(user?.email);
    })
  }

  crearUsurio(nombre: string, email: string, password: string) {

    return this.auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {

      const newUser = new Usuario(user.uid, nombre, user.email);
      console.log('***newUser',newUser, {...newUser});
      return this.firestore.doc(`${ user.uid }/usuario`).set( {...newUser} )
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
