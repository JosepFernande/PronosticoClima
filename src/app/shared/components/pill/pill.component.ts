import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ClimaticLocation } from "../../models/climatic-locations.interfaces";

@Component({
    selector: 'app-pill',
    standalone: true,
    templateUrl: './pill.component.html',
    styleUrls: [
        './pill.component.css',
    ]
})
export class PillComponent {
    @Input()
    public location!: ClimaticLocation;

    @Output()
    public onClick: EventEmitter<ClimaticLocation> = new EventEmitter<ClimaticLocation>();

    clickResponse(evt: MouseEvent) {
        this.onClick.emit(this.location);
    }
}