import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  boxes = [1, 2];

  addBox(): void {
    this.boxes.push(this.boxes.length + 1);
  }
}
