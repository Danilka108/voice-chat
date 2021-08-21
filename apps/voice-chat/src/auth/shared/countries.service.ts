import { Injectable, Inject } from '@angular/core'
import { Country, COUNTRIES } from '../providers'

@Injectable()
export class CountriesService {
  constructor(@Inject(COUNTRIES) readonly countries: Country[]) {}

  trackBy(_: number, item: Country) {
    return item.telCode
  }

  getDefaultCountry() {
    return this.getCountryByKey('name', 'United States')
  }

  getIndexOfDefaultCountry() {
    return this.getIndexOfCountryByKey('name', 'United States')
  }

  getCountryByKey<T extends keyof Country>(key: T, value: Country[T]) {
    return this.countries.find((country) => country[key] === value) || null
  }

  getCountryByIndex(index: number) {
    return this.countries[index] || null
  }

  getIndexOfCountryByKey<T extends keyof Country>(key: T, value: Country[T]) {
    return this.countries.findIndex((country) => country[key] === value) || -1
  }
}
