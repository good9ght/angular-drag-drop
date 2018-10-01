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

    const prevRect = currentIndex > 0 ? this.clientRects[currentIndex - 1] : undefined;
    const nextRect = currentIndex < this.clientRects.length - 1 ? this.clientRects[currentIndex + 1] : undefined;

    if (prevRect && event.clientY < prevRect.top + prevRect.height / 2) {
      // Move Back
      this.sort.emit(new SortEvent(
        currentIndex,
        currentIndex - 1
      ));
    } else if (nextRect && event.clientY > nextRect.top + nextRect.height / 2) {
      // Move Forward
      this.sort.emit(new SortEvent(
        currentIndex,
        currentIndex + 1
      ));
      console.log('Move Forward');
    }
  }
}
