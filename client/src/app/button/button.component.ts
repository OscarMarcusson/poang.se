import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  input,
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
    "[class]": "this.style()",
    "[class.loading]": "this.loading()",
  },
})
export class ButtonComponent {
  label = input<string>("");
  style = input<undefined | "submit">();
  loading = input<boolean>(false);

  @Output()
  click = new EventEmitter();

  constructor(private host: ElementRef) {
  }

  focus() {
    this.host.nativeElement.focus();
  }

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
