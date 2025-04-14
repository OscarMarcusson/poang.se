import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from "@angular/core";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [],
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
  host: {
    "tabindex": "0",
  },
})
export class ButtonComponent {
  @Input()
  label = "";

  @HostBinding("class")
  @Input()
  style: undefined | "submit";

  @Output()
  click = new EventEmitter();

  protected onClick() {
    this.click.emit();
  }

  @HostListener("keydown", ["$event"])
  private onKey(event: KeyboardEvent) {
    if (event.key == "Enter" || event.key == "Space") {
      this.onClick();
    }
  }
}
