import * as ui from './../../shared/ui.actions';
import { AppState } from './../../app.reducer';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registroForm: FormGroup;
  public cargando: boolean = false;
  private uiSubcription: Subscription

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.uiSubcription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy() {
    this.uiSubcription.unsubscribe();
  }

  crearUsuario() {
    if (this.registroForm.valid) {

      // Swal.fire({
      //   title: 'Espere por favor',
      //   didOpen: () => {
      //     Swal.showLoading()
      //   }
      // })
      this.store.dispatch(ui.isLoading());

      const { nombre, correo, password } = this.registroForm.value;

      this.authservice.crearUsurio(nombre, correo, password).then(ret => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());

        this.router.navigate(['/'])
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
