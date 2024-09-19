import { Component } from '@angular/core';
import { SvgLoadSpinnerComponent } from '../svg/svg-load-spinner.component';

@Component({
  selector: 'loading-spinner',
  standalone: true,
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
  imports: [SvgLoadSpinnerComponent]
})
export class LoadingSpinnerComponent {

}
