import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((countries) =>
        countries.map((country) => ({
          name: country.name.common,
          code: country.cca2,
          dialCode: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ''),
          flag: country.flags.svg,
        }))
      )
    );
  }
}