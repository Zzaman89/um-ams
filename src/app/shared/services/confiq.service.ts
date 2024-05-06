import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ConfiqService {
  strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
  email = '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$';

  patterns = {
    Password: this.strongRegex,
    Email: this.email
  };

  constructor() { }

  getPatternConfig(): any {
    return this.patterns;
  }
}
