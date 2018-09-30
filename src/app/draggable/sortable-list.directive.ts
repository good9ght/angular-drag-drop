import { Directive, ContentChildren, QueryList, AfterContentInit, Output } from '@angular/core';
import { SortableDirective } from './sortable.directive';
import { EventEmitter } from 'protractor';

@Directive({
  selector: '[appSortableList]'
})
export class SortableListDirective implements AfterContentInit {
  @ContentChildren(SortableDirective) sortables: QueryList<(SortableDirective)>;
  @Output() sort = new EventEmitter();

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
      console.log('Move Back');
    } else if (nextRect && event.clientY > nextRect.top + nextRect.height / 2) {
      // Move Forward
      console.log('Move Forward');
    }
  }
}
