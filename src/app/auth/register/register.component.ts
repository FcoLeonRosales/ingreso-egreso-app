import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  crearUsuario() {
    if (this.registroForm.valid) {

      Swal.fire({
        title: 'Espere por favor',
        didOpen: () => {
          Swal.showLoading()
        }
      })

      const { nombre, correo, password } = this.registroForm.value;

      this.authservice.crearUsurio(nombre, correo, password).then(ret => {
        Swal.close();
        this.router.navigate(['/'])
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
