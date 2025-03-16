import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, Search } from 'lucide-angular';
import { AuthService } from '../auth/service/auth-service.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  readonly Search = Search;

  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout();
  }
}
