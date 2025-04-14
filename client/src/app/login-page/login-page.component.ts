import { Component, ViewChild } from "@angular/core";
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
  name: string = "";
  password: string = "";

  @ViewChild("nameField")
  nameField!: InputComponent;

  @ViewChild("passwordField")
  passwordField!: InputComponent;

  login() {
    console.warn(this.nameField);
    // event.preventDefault();
    // event.stopPropagation();
    console.log(this.name);
    return false;
  }

  selectSubmit() {
    throw new Error("Method not implemented.");
  }
  selectUserName() {
    this.nameField.focus();
  }
  selectPassword() {
    this.passwordField.focus();
  }
}
