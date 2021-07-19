import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from './../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  loginUser() {
    if (this.loginForm.valid) {

      Swal.fire({
        title: 'Espere por favor',
        didOpen: () => {
          Swal.showLoading()
        }
      });

      const { email, password } = this.loginForm.value;

      this.authservice.loginUsuario(email, password).then(e => {
        Swal.close();
        this.router.navigate(['/']);
      }).catch(e => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.message,
        })
      });
    }
  }

}
