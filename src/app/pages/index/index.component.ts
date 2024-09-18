import { Component, isStandalone, OnInit } from "@angular/core";
import * as Highcharts from 'highcharts';
import { MainService } from "../../services/main.service";

@Component({
    selector: '',
    standalone: true,
    templateUrl: './index.component.html',
    styles: `
        .example{
            padding: 1rem 0;
            max-width: 100%;
            word-break: break-all;
        }
    `
})
export class IndexComponent implements OnInit{
    private chart!: Highcharts.Chart;

    constructor(public mainServ: MainService) {}

    ngOnInit(): void {
        this.chart = Highcharts.chart('graph', {
            title: {
                text: 'Pronóstico de clima (x días)'
            },
            subtitle: {
                text: 'FechaInicio - FechaFin'
            },
            xAxis: {
                categories: ['Hoy', 'Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5'],
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            series: [
                {
                    name: 'Temperatura',
                    data: [1, 2, 3, 4, 5, 6],
                    type: "line",

                },
                {
                    name: 'Sensación térmica',
                    data: [6, 5, 4, 3, 2, 1],
                    type: "line"
                },
                {
                    name: 'Precipitación',
                    data: [.1, .2, .3, .5, .6],
                    type: "column"
                }
            ],
            credits: {
                enabled: false
            }
        });    
    }

    handleClick(){
        alert("temp handle click!");
    }
}