import { Component, viewChild } from "@angular/core";
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: "app-login-page",
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: "./login-page.component.html",
  styleUrl: "./login-page.component.scss",
})
export class LoginPageComponent {
  protected name = "";
  protected password = "";
  protected loadingLogin = false;
  protected loadingRegister = false;

  private nameField = viewChild<InputComponent>("nameField");
  private passwordField = viewChild<InputComponent>("passwordField");
  private loginButton = viewChild<ButtonComponent>("loginButton");
  private registerButton = viewChild<ButtonComponent>("registerButton");

  protected login() {
    if (this.isLoading()) return;

    this.loginButton()?.focus();
    this.loadingLogin = true;
    this.startLoading();

    // TODO: Implementera
    console.warn("Implementera inloggning med " + this.name);
    this.finishLoading();
  }

  protected register() {
    if (this.isLoading()) return;

    this.registerButton()?.focus();
    this.loadingRegister = true;
    this.startLoading();

    console.warn("Implementera användarregistrering");
    // TODO: Implementera
    this.finishLoading();
  }

  private startLoading() {
    // Ersätt lösenordet med motsvarande *** bara för att det inte direkt ska flimra bort
    const password = this.password;
    this.password = "*".repeat(password.length);
  }

  private isLoading() {
    return this.loadingLogin || this.loadingRegister;
  }

  private finishLoading() {
    this.password = "";
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
