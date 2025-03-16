import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../../shared/service/country.service';

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
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
    });
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
      this.router.navigate(['/login']);
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
}
