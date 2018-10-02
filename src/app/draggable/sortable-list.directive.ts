import { Directive, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { SortableDirective } from './sortable.directive';
import { SortEvent } from './models/sort-event.modal';

@Directive({
  selector: '[appSortableList]'
})
export class SortableListDirective implements AfterContentInit {
  @ContentChildren(SortableDirective) sortables: QueryList<(SortableDirective)>;
  @Output() sort = new EventEmitter<SortEvent>();

  private clientRects: ClientRect[];

  ngAfterContentInit(): void {
    this.sortables.forEach(sortable => {
      sortable.dragStart.subscribe(() => this.measureClientRects());
      sortable.dragMove.subscribe(event => this.detectSorting(sortable, event));
    });
  }

  private measureClientRects(): any {
    this.clientRects = this.sortables.map(sortable => sortable.viewRect);
  }

  private detectSorting(sortable: SortableDirective, event: PointerEvent): any {
    const currentIndex = this.sortables.toArray().indexOf(sortable);
    const currentRect = this.clientRects[currentIndex];

    this.clientRects
      .slice()
      .sort((rectA, rectB) => this.distance(rectA, currentRect) - this.distance(rectB, currentRect))
      .forEach(rect => {
        if (rect === currentRect) {
          return false;
        }

        const isHorizontal = rect.top === currentRect.top;
        const isBefore = isHorizontal ? rect.left < currentRect.left : rect.top < currentRect.top;

        let moveForward = false;
        let moveBack = false;

        if (isHorizontal) {
          moveBack = isBefore && event.clientX < rect.left + rect.width / 2;
          moveForward = !isBefore && event.clientX > rect.left + rect.width / 2;
        } else {
          moveBack = isBefore && event.clientY < rect.top + rect.height / 2;
          moveForward = !isBefore && event.clientY > rect.top + rect.height / 2;
        }

        if (moveBack || moveForward) {
          this.sort.emit(new SortEvent(currentIndex, this.clientRects.indexOf(rect)));
          return true;
        }

        return false;
      });
  }

  private distance(a: ClientRect, b: ClientRect): number {
    return Math.sqrt(
      Math.pow(b.top - a.top, 2) +
      Math.pow(b.left - a.left, 2)
    );
  }
}
