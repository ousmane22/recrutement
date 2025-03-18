import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from '../../../auth/model/country.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-country-modal',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './country-modal.component.html',
  styleUrl: './country-modal.component.css'
})
export class CountryModalComponent {
  @Input() countries: Country[] = [];
  @Input() searchQuery: string = '';

  @Output() selectCountry = new EventEmitter<Country>();

  filteredCountries(): Country[] {
    return this.countries.filter(country =>
      country.name.common.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onSelectCountry(country: Country): void {
    this.selectCountry.emit(country);
  }
}
