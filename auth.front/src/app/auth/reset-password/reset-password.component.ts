import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth-service.service';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string | null = null;
  email: string | null = null;
  resetPasswordForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  showPasswordConfirmation: boolean = false;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
      token: new FormControl(''),
      email: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];

      if (this.token) {
        this.resetPasswordForm.patchValue({ token: this.token });
      }
      if (this.email) {
        this.resetPasswordForm.patchValue({ email: this.email });
      }
    });
  }

  togglePasswordVisibility(field: 'password' | 'password_confirmation'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'password_confirmation') {
      this.showPasswordConfirmation = !this.showPasswordConfirmation;
    }
  }
  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const { email, token, password, password_confirmation } = this.resetPasswordForm.value;
  
      if (password !== password_confirmation) {
        this.errorMessage = 'Les mots de passe ne correspondent pas.';
        return;
      }
  
      this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Mot de passe réinitialisé avec succès.';
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Une erreur est survenue. Veuillez réessayer.';
          this.successMessage = ''; 
        }
      });
    }
  }  
}
