import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PillComponent } from './shared/components/pill/pill.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PillComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto-final';
  public pills: {id: number, pillText: string }[] = [
    {
      id: 1,
      pillText: 'América/Managua'
    }
  ];
}
