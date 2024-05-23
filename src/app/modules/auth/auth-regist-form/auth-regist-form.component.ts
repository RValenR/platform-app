import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { FocusTrapModule } from 'primeng/focustrap';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-auth-regist-form',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, PasswordModule, FocusTrapModule, MessagesModule],
  templateUrl: './auth-regist-form.component.html',
  styleUrl: './auth-regist-form.component.css'
})
export class AuthRegistFormComponent {
  fireAuthService = inject(AuthService);
  router = inject(Router);
  messages = [];
  email: string = '';
  username: string = '';
  password: string = '';

  login() {
    console.log('login', this.email, this.password);
    let userSignIn = {
      email: this.email,
      password: this.password
    }
    this.fireAuthService.signIn(userSignIn).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.error('Error during login:', error);
      this.messages = [
        { severity: 'error', detail: 'Error al iniciar sesion, intentelo nuevamente' }
      ];
    })
  }

  onSubmit(): void {
    console.log('register init')
    this.fireAuthService.register(
      this.email,
      this.username,
      this.password
    ).subscribe(() => {
      this.router.navigateByUrl('/home')
    })
  }
}
