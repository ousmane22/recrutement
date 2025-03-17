import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../../shared/service/country.service';
import { minimumAgeValidator } from '../../shared/validators/validators';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  step = 1;
  registerForm: FormGroup;
  countries: any[] = [];
  selectedCountry: any = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private countryService: CountryService
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


  ngOnInit(): void {
    this.countryService.getCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des pays:', error);
      },
    });
  }

  onSubmit() {
    if (this.step < 3) {
      this.step++;
    } else {
      console.log(this.registerForm.value);
    }
  }

  onCountryChange(event: any) {
    const selectedCountryCode = event.target.value;
    this.selectedCountry = this.countries.find(
      (country) => country.code === selectedCountryCode
    );

    if (this.selectedCountry) {
      const phoneControl = this.registerForm.get('phone');
      phoneControl?.setValue(this.selectedCountry.dialCode + ' ');
    }
  }

  get formControls() {
    return this.registerForm.controls;
  }
  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }
}
