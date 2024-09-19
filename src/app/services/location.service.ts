import { Injectable } from '@angular/core';
import { ClimaticLocation } from '../shared/models/climatic-locations.interfaces';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private myLocation: Subject<ClimaticLocation> = new Subject();
  public myLocation$: Observable<ClimaticLocation> = this.myLocation.asObservable();


  public locations: ClimaticLocation[] = [
    {
      id: 1,
      name: 'Nicaragua - Managua',
      latitude: 12.434473,
      longitude: -86.88103,
      days: null
    },
    {
      id: 2,
      name: 'Costa Rica - San Vito',
      latitude: 8.8207677,
      longitude: -82.970384,
      days: null
    },
    {
      id: 3,
      name: 'Japon - Tokyo',
      latitude: 35.6360243,
      longitude: 139.83841807017257,
      days: null
    },
    {
      id: 4,
      name: 'Marruecos - Marruecos',
      latitude: 31.1728205,
      longitude: -7.3362482,
      days: null
    },
    {
      id: 5,
      name: 'Nürburgring - Alemania',
      latitude: 50.3309196,
      longitude: 6.940674171000003,
      days: null
    },
  ]

  constructor() {
    this.getClimaticLocations()
  }

  private getClimaticLocations() {
    const locations = localStorage.getItem('locations');
    if (locations) this.locations = JSON.parse(locations) as ClimaticLocation[]
  }

  private location: ClimaticLocation = this.locations[0]

  selectLocation(newLocation: ClimaticLocation) {
    this.location = newLocation
    this.myLocation.next(this.location)
  }

  getLocation(): ClimaticLocation {
    return this.location
  }

  newClimaticLocation(newLocation: ClimaticLocation) {
    this.locations.push(newLocation)
    this.saveLocalStorage()
  }

  private saveLocalStorage() {
    localStorage.setItem('locations', JSON.stringify(this.locations));
  }

  clearClimaticLocations() {
    this.locations = this.locations.slice(0, 5)
    this.saveLocalStorage()
  }
}
