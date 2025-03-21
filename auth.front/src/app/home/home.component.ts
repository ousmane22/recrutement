import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Droplets, LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LucideAngularModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly DropletsIcon = Droplets;

  constructor(private router: Router) {}

  toLoginPage() {
    this.router.navigate(['/login']);
  }
}
