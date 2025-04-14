import { Component, HostBinding, Input } from "@angular/core";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [],
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
})
export class ButtonComponent {
  @Input()
  label = "";

  @HostBinding("class")
  @Input()
  style: undefined | "submit";
}
