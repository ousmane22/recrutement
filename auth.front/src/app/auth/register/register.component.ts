import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { minimumAgeValidator } from '../../shared/validators/validators';
import { AuthService } from '../service/auth-service.service';
import { Country } from '../model/country.model';
import { Check, CheckCheck, Eye, EyeOff, LucideAngularModule, Search } from 'lucide-angular';
import { CountrySelectorComponent } from './components/country-selector/country-selector.component';
import { StepIndicatorComponent } from './components/step-indicator/step-indicator.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, LucideAngularModule, CountrySelectorComponent, StepIndicatorComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  step = 1;
  registerForm: FormGroup;
  verificationSent = false;
  selectedCountry: Country | null = null;
  otpValid: boolean = false;
  otpErrorMessage: string = '';
  otpSuccessIcon: boolean = false;
  showPassword = false;
  isSubmitting: boolean = false;


  readonly success = CheckCheck;
  readonly eyeoff = EyeOff;
  readonly eye = Eye;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, minimumAgeValidator]],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      verificationCode: ['']
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('password_confirmation')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  ngOnInit() {
    const defaultOtp = '1200';
    localStorage.setItem('otp', defaultOtp);
  }

  onSubmit() {

    if (this.step < 3) {
      this.step++;
    } else {
      this.isSubmitting = true;
      if (this.verificationSent && this.registerForm.get('verificationCode')?.valid) {
        this.authService.register(this.registerForm.value).subscribe({
          next: (response) => {
            this.isSubmitting = false;
            alert('Inscription reussie');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.isSubmitting = false;
            console.error('Erreur lors de l\'inscription:', error);
          }
        });
      } else {
        this.isSubmitting = false;
        alert('Veuillez entrer un code de vérification valide.');
      }
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  sendVerificationCode() {
    const phoneNumber = this.registerForm.get('phone')?.value;

    if (phoneNumber) {
      this.verificationSent = true;
      alert('Code de vérification envoyé par SMS.');
    }
  }

  onOtpInputChange() {
    const otpFromStorage = localStorage.getItem('otp');
    const enteredOtp = this.registerForm.get('verificationCode')?.value;

    if (enteredOtp && otpFromStorage && otpFromStorage === enteredOtp.toString()) {
      this.otpValid = true;
      this.otpErrorMessage = '';
      this.otpSuccessIcon = true;
    } else {
      this.otpValid = false;
      this.otpErrorMessage = 'Code incorrect, veuillez réessayer.';
      this.otpSuccessIcon = false;
    }
  }

  onCountrySelected(country: Country) {
    this.selectedCountry = country;
    this.registerForm.get('country')?.setValue(country.name.common);
  }

  getDialCode(country: Country): string {
    if (country.idd.root && country.idd.suffixes && country.idd.suffixes.length > 0) {
      return `${country.idd.root}${country.idd.suffixes[0]}`;
    }
    return '';
  }
}
