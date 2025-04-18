import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticated = false;
  name = '';
  onChange = new EventEmitter();

  constructor() {
    this.refresh();
  }

  set(name?: string) {
    if (name) {
      this.authenticated = true;
      this.name = name;
      this.onChange.emit();
    } else {
      this.clear();
    }
  }

  clear() {
    this.authenticated = false;
    this.name = '';
    this.onChange.emit();
  }

  async refresh() {
    try {
      const response = await fetch('/api/refresh');
      if (response.ok) {
        this.set(await response.text());
        console.log('Authenticated as ' + this.name);
      } else {
        this.clear();
        console.warn('Could not authenticate');
      }
    } catch (e) {
      this.clear();
      console.error('Could not authenticate', e);
    }
  }
}
