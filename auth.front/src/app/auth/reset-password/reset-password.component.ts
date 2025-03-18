import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  successMessage = '';
  errorMessage = '';
  showPassword = false;
  showPasswordConfirmation = false;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetPasswordForm = this.createResetPasswordForm();
  }

  ngOnInit(): void {
    this.setFormValuesFromQueryParams();
  }

  private createResetPasswordForm(): FormGroup {
    return new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
      token: new FormControl(''),
      email: new FormControl(''),
    });
  }

  private setFormValuesFromQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || null;
      this.email = params['email'] || null;

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
    } else {
      this.showPasswordConfirmation = !this.showPasswordConfirmation;
    }
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) return;

    this.isLoading = true;
    const { password, password_confirmation } = this.resetPasswordForm.value;

    if (password !== password_confirmation) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      this.isLoading = false;
      return;
    }

    this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: () => this.handleResetSuccess(),
      error: (error) => this.handleResetError(error),
    });
  }

  private handleResetSuccess(): void {
    this.successMessage = 'Mot de passe réinitialisé avec succès.';
    this.errorMessage = '';
    this.isLoading = false;
    alert('Votre mot de passe a été réinitialisé avec succès ! Vous allez être redirigé vers la page de connexion.');
    this.router.navigate(['/login']);
  }

  private handleResetError(error: any): void {
    this.errorMessage = error.error?.message || 'Une erreur est survenue. Veuillez réessayer.';
    this.successMessage = '';
    this.isLoading = false;
  }
}