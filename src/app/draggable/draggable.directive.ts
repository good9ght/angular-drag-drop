import { Directive, HostListener, HostBinding, Output, EventEmitter, ContentChild, ElementRef } from '@angular/core';
import { DraggableHelperDirective } from './draggable-helper.directive';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;

  @Output() dragStart = new EventEmitter();
  @Output() dragMove = new EventEmitter();
  @Output() dragEnd = new EventEmitter();

  constructor(public elementRef: ElementRef) { }

  @HostListener('pointerdown', ['$event']) onPointerDown(event: PointerEvent): void {
    event.stopPropagation();
    this.dragging = true;
    this.dragStart.emit(event);
  }

  @HostListener('document:pointermove', ['$event']) onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    this.dragMove.emit(event);
  }

  @HostListener('document:pointerup', ['$event']) onPointerUp(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    this.dragging = false;
    this.dragEnd.emit(event);
  }

  get viewRect(): ClientRect {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }
}
