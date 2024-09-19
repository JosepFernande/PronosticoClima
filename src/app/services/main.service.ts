import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { OpenMeteo } from "../shared/models/open-meteo.interfaces";
import { catchError, Observable, of } from "rxjs";
import { ClimaticLocation } from "../shared/models/climatic-locations.interfaces";
interface ApiParams {
    [key: string]: string
}
@Injectable({
    providedIn: 'root'
})
export class MainService {
    private http = inject(HttpClient)

    private apiUrl: string = 'https://api.open-meteo.com/v1/forecast?';
    private otherParams: ApiParams = {
        current: 'temperature_2m,apparent_temperature,precipitation,rain',
        timezone: 'auto',
        daily: "temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum",
    }


    getHttpLocationClimaticRequest(location: ClimaticLocation): Observable<OpenMeteo> {
        const params = this.buildWeatherApiParams(location)

        return this.http.get<OpenMeteo>(this.apiUrl, { params }).pipe(
            catchError(() => of()),
        );
    }


    private buildWeatherApiParams({ latitude, longitude, days }: ClimaticLocation): HttpParams {
        const day: number = days ? days : 7
        let params = new HttpParams()
            .set('latitude', latitude.toString())
            .set('longitude', longitude.toString())
            .set('forecast_days', day);

        Object.keys(this.otherParams).forEach(key => {
            params = params.set(key, this.otherParams[key]);
        });
        return params;
    }

}