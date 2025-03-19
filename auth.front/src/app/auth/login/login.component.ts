import { Component } from '@angular/core';
import { Eye, EyeClosed, EyeOff, LucideAngularModule } from 'lucide-angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth-service.service';
import { LoginResponse } from '../model/login-response.model';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from '../../shared/components/privacy-policy/privacy-policy.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LucideAngularModule, ReactiveFormsModule, FormsModule, CommonModule, PrivacyPolicyComponent,TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  showPrivacy: boolean = false;
  passwordVisible: boolean = false;

  readonly eyeOnIcon = EyeClosed;
  readonly eyeOffIcon = EyeOff;


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response: LoginResponse) => {
          this.authService.storeToken(response.data.token);
          this.navigateTo('/welcome');
        },
        error: () => {
          this.errorMessage = 'Identifiants invalides, veuillez réessayer.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir les deux champs.';
      this.isLoading = false;
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  showPrivacyDialog() {
    this.showPrivacy = true;
  }

  closeModal(): void {
    this.showPrivacy = false;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
