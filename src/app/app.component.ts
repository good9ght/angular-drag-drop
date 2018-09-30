import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  boxes = [
    'Box 1',
    'Box 2',
    'Box 3',
    'Box 4'
  ];
}
