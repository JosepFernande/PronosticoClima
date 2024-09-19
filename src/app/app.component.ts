import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PillComponent } from './shared/components/pill/pill.component';
import { ClimaticLocation } from './shared/models/climatic-locations.interfaces';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PillComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private locationServ = inject(LocationService)
  public pills: ClimaticLocation[] = [];


  ngOnInit(): void {
    this.pills = this.locationServ.locations
  }

  pillSelected(location: ClimaticLocation) {
    this.locationServ.selectLocation(location)
  }

  resetLocation() {
    this.locationServ.clearClimaticLocations()
    this.pills = this.locationServ.locations
  }
}
