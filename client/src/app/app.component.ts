import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthService } from './services/auth/auth.service';
import { ButtonComponent } from './button/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginPageComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected firstAuth = true;
  protected displayLogin = true;
  user?: string;

  private auth = inject(AuthService);

  constructor(changeDetector: ChangeDetectorRef) {
    this.auth.onChange.asObservable().subscribe(() => {
      this.firstAuth = false;
      this.displayLogin = !this.auth.authenticated;
      this.user = this.auth.name;
      changeDetector.detectChanges();
    });
  }
}
