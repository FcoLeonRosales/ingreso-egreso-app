import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';

import { AppState } from './../../app.reducer';
import { AuthService } from './../../services/auth.service';
import { Usuario } from './../../models/usuario.models';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public nombre: string;
  private userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
      .pipe(filter(({ user }) => user != null))
      .subscribe(({ user }) => this.nombre = user.nombre);
  }

  logOut() {
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      }
    })
    this.authService.logOut().then(() => {
      Swal.close();
      this.userSubscription.unsubscribe();
      this.router.navigate(['/login']);
    });
  }

}
