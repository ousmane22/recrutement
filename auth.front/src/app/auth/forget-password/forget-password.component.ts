import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth-service.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']  
})
export class ForgetPasswordComponent {
  forgotPasswordForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe({
        next: (response) => {
          if (response.status === 200) {
            console.log(response);
            this.successMessage = response.message;
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Une erreur s\'est produite. Veuillez réessayer.';
            this.successMessage = '';
          }
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = error.error.message;
          this.successMessage = '';
        }
      });
    }
  }
}
