import { Component, inject, viewChild } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  protected name = '';
  protected password = '';
  protected loadingLogin = false;
  protected loadingRegister = false;

  private nameField = viewChild<InputComponent>('nameField');
  private passwordField = viewChild<InputComponent>('passwordField');
  private loginButton = viewChild<ButtonComponent>('loginButton');
  private registerButton = viewChild<ButtonComponent>('registerButton');

  private auth = inject(AuthService);

  protected async login() {
    if (this.isLoading()) return;

    this.loginButton()?.focus();
    this.loadingLogin = true;
    this.startLoading();

    const response = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({
        user: this.name,
        password: this.password,
      }),
    });
    if (response.ok) {
      this.auth.set(await response.text());
    } else {
      this.auth.clear();
      // TODO: Visa en modal för inloggningsfel eller något liknande
      console.error('Kunde inte logga in');
    }

    this.finishLoading();
  }

  protected register() {
    if (this.isLoading()) return;

    this.registerButton()?.focus();
    this.loadingRegister = true;
    this.startLoading();

    console.warn('Implementera användarregistrering');
    // TODO: Implementera
    this.finishLoading();
  }

  private startLoading() {
    // Ersätt lösenordet med motsvarande *** bara för att det inte direkt ska flimra bort
    const password = this.password;
    this.password = '*'.repeat(password.length);
  }

  private isLoading() {
    return this.loadingLogin || this.loadingRegister;
  }

  private finishLoading() {
    this.password = '';
    this.loadingLogin = false;
    this.loadingRegister = false;
  }

  protected selectUserName() {
    this.nameField()?.focus();
  }

  protected selectPassword() {
    this.passwordField()?.focus();
  }
}
