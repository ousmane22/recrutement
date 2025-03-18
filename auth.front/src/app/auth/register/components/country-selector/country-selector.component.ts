import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from '../../../model/country.model';
import { LucideAngularModule, Search } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-country-selector',
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.css'
})
export class CountrySelectorComponent {
  @Input() selectedCountry: Country | null = null;
  @Output() countrySelected = new EventEmitter<Country>();

  isCountryModalOpen = false;
  searchQuery = '';
  countries: Country[] = [];
  loading = true;

  readonly search = Search;

  ngOnInit() {
    this.fetchCountries();
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

  get filteredCountries(): Country[] {
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
    this.countrySelected.emit(country);
  }
}