import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../../shared/service/country.service';
import { minimumAgeValidator } from '../../shared/validators/validators';
import { AuthService } from '../service/auth-service.service';
import { Country } from '../model/country.model';
import { Check, LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  step = 1;
  registerForm: FormGroup;
  verificationSent = false;
  isCountryModalOpen = false;
  selectedCountry: Country | null = null;
  searchQuery = '';
  countries: Country[] = [];
  loading = true;
  otpValid: boolean = false;
  otpErrorMessage: string = '';
  otpSuccessIcon: boolean = false;

  readonly search = Search;
  readonly success = Check;

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
    this.fetchCountries();
    const defaultOtp = '1200';
    localStorage.setItem('otp', defaultOtp);
  }

  onSubmit() {
    if (this.step < 3) {
      this.step++;
    } else {
      if (this.verificationSent && this.registerForm.get('verificationCode')?.valid) {
        this.authService.register(this.registerForm.value).subscribe({
          next: (response) => {
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Erreur lors de l\'inscription:', error);
          }
        });
      } else {
        alert('Veuillez entrer un code de vérification valide.');
      }
    }
  }


  fetchCountries() {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data: Country[]) => {
        this.countries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        this.loading = false;
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
        this.loading = false;
      });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  filteredCountries(): Country[] {
    return this.countries.filter(country =>
      country.name.common.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getDialCode(country: Country): string {
    if (country.idd.root && country.idd.suffixes && country.idd.suffixes.length > 0) {
      return `${country.idd.root}${country.idd.suffixes[0]}`;
    }
    return '';
  }

  onSelectCountry(country: Country) {
    this.selectedCountry = country;
    this.isCountryModalOpen = false;
    this.registerForm.get('country')?.setValue(country.name.common);
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
    
    console.log('OTP stocké:', otpFromStorage); 
    console.log('OTP saisi:', enteredOtp);
    
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
}
