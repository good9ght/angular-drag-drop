import { Component } from '@angular/core';
import { SortEvent } from './draggable/models/sort-event.modal';

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

  sort(event: SortEvent) {
    const current = this.boxes[event.currentIndex];
    const swapWith = this.boxes[event.newIndex];

    this.boxes[event.newIndex] = current;
    this.boxes[event.currentIndex] = swapWith;
  }
}
