import { Directive, ContentChildren, QueryList, AfterContentInit, ElementRef } from '@angular/core';
import { MovableDirective } from './movable.directive';
import { Boundaries } from './models/boundaries.model';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appMovableArea]'
})
export class MovableAreaDirective implements AfterContentInit {
  @ContentChildren(MovableDirective) movables: QueryList<MovableDirective>;

  private boundaries: Boundaries;
  private subscriptions: Subscription[] = [];

  constructor(private element: ElementRef) {}

  ngAfterContentInit(): void {
    this.movables.changes.subscribe(() => {

      this.subscriptions.forEach(s => s.unsubscribe());

      this.movables.forEach(movable => {
        this.subscriptions.push(movable.dragStart.subscribe(() => this.measureBoundaries(movable)));
        this.subscriptions.push(movable.dragMove.subscribe(() => this.maintainBoundaries(movable)));
      });

    });

    this.movables.notifyOnChanges();
  }

  private measureBoundaries(movable: MovableDirective) {
    this.boundaries = new Boundaries(
      this.viewRect.left - movable.viewRect.left + movable.position.x,
      this.viewRect.right - movable.viewRect.right + movable.position.x,
      this.viewRect.top - movable.viewRect.top + movable.position.y,
      this.viewRect.bottom - movable.viewRect.bottom + movable.position.y
    );
  }

  private maintainBoundaries(movable: MovableDirective) {
    movable.position.x = Math.max(this.boundaries.minX, movable.position.x);
    movable.position.x = Math.min(this.boundaries.maxX, movable.position.x);
    movable.position.y = Math.max(this.boundaries.minY, movable.position.y);
    movable.position.y = Math.min(this.boundaries.maxY, movable.position.y);
  }

  private get viewRect(): ClientRect {
    return this.element.nativeElement.getBoundingClientRect();
  }

}
