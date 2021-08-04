import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from './../../shared/ui.actions';

import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup
  public cargando: boolean = false;
  private uiSubcription: Subscription

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // slecect('ui') selecciona el estore en este caso ui pero si tengo otro lo pongo entre las comillas simples
    this.uiSubcription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.uiSubcription.unsubscribe();
  }

  loginUser() {
    if (this.loginForm.valid) {

      this.store.dispatch(ui.isLoading());

      // Swal.fire({
      //   title: 'Espere por favor',
      //   didOpen: () => {
      //     Swal.showLoading()
      //   }
      // });

      const { email, password } = this.loginForm.value;

      this.authservice.loginUsuario(email, password).then(e => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      }).catch(e => {
        this.store.dispatch(ui.stopLoading());

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.message,
        })
      });
    }
  }

}
