import { Component, inject, OnInit } from "@angular/core";
import * as Highcharts from 'highcharts';
import { MainService } from "../../services/main.service";
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { LocationService } from "../../services/location.service";
import { ClimaticLocation } from "../../shared/models/climatic-locations.interfaces";
import { FormsModule } from "@angular/forms";
import { ModalFormComponent } from "../../shared/components/modal-form/modal-form.component";

@Component({
    selector: '',
    standalone: true,
    templateUrl: './index.component.html',
    imports: [LoadingSpinnerComponent, FormsModule, ModalFormComponent],
    styles: `
       
    `
})
export class IndexComponent implements OnInit {

    displayModal: boolean = false

    loading: boolean = false
    private chart!: Highcharts.Chart;
    private mainServ = inject(MainService)
    private locationServ = inject(LocationService)
    location: ClimaticLocation = this.locationServ.getLocation()

    ngOnInit(): void {
        this.getLocationClimatic()
        this.locationServ.myLocation$.subscribe(selectedLocation => {
            this.location = selectedLocation
            this.getLocationClimatic()
        })
    }

    getLocationClimatic() {
        this.loading = true
        this.mainServ.getHttpLocationClimaticRequest(this.location).subscribe(x => {
            console.log(x);

            this.chart = Highcharts.chart('graph', {
                title: {
                    text: 'Pronóstico de clima (x días)'
                },
                subtitle: {
                    text: `Del ${this.formatDate(x.daily.time[0])} al ${this.formatDate(x.daily.time[x.daily.time.length - 1])}`
                },
                xAxis: {
                    categories: this.getDayOfWeekFromDates(x.daily.time),
                },
                yAxis: {
                    title: {
                        text: null
                    }
                },
                series: [
                    {
                        name: 'Temperatura',
                        data: x.daily.temperature_2m_max,
                        type: "line",

                    },
                    {
                        name: 'Sensación térmica',
                        data: x.daily.apparent_temperature_max,
                        type: "line"
                    },
                    {
                        name: 'Precipitación',
                        data: x.daily.precipitation_sum,
                        type: "column"
                    }
                ],
                credits: {
                    enabled: false
                }
            });
            this.loading = false
        })
    }

    private getDayOfWeekFromDates(dates: Date[]): string[] {
        const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

        return dates.map(date => {
            const dayIndex: Date = new Date(date);
            return daysOfWeek[dayIndex.getDay()];
        });
    }

    private formatDate(dateString: Date): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    openModal() {
        this.displayModal = true
    }

    closeModal(display: boolean) {
        this.displayModal = !display
    }
}