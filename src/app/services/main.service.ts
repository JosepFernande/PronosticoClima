import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MainService{
    public readonly EXAMPLE_REQ_URL: string = `https://api.open-meteo.com/v1/forecast?latitude=12.434473&longitude=-86.88103&current=temperature_2m,apparent_temperature,precipitation,rain&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation&timezone=auto`;
}