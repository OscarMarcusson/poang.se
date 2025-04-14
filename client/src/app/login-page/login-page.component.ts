import {
  Component,
  ComponentRef,
  computed,
  ViewChild,
  viewChild,
} from "@angular/core";
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
  name = "";
  password = "";

  nameField = viewChild<InputComponent>("nameField");
  passwordField = viewChild<InputComponent>("passwordField");
  loginButton = viewChild<ButtonComponent>("loginButton");
  registerButton = viewChild<ButtonComponent>("registerButton");

  protected login() {
    this.loginButton()?.focus();
    console.warn("Implementera inloggning med " + this.name);
    // TODO: Implementera
    this.password = "";
  }

  protected register() {
    this.registerButton()?.focus();
    console.warn("Implementera användarregistrering");
    // TODO: Implementera
    this.password = "";
  }

  protected selectUserName() {
    this.nameField()?.focus();
  }

  protected selectPassword() {
    this.passwordField()?.focus();
  }
}
