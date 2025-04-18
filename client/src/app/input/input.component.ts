import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [],
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss",
})
export class InputComponent {
  @Input()
  value: string = "";
  @Output()
  valueChange = new EventEmitter<string>();

  @Input()
  label: string = "";

  @Input()
  hide = false;

  @Output()
  onEnter = new EventEmitter();

  @ViewChild("input")
  protected input!: ElementRef<HTMLInputElement>;

  focus() {
    this.input.nativeElement.focus();
  }

  protected onFocus() {
    this.input.nativeElement.selectionStart = 0;
    this.input.nativeElement.selectionEnd =
      this.input.nativeElement.value.length;
  }

  protected onValueChanged(event: any) {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  }

  protected onKey(event: KeyboardEvent) {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        event.stopPropagation();

        switch (event.key) {
          case "Enter":
            this.onEnter.emit();
            break;
        }
        break;
    }
  }
}
