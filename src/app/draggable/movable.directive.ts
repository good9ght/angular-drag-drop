import { Directive, HostListener, HostBinding, Input } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { Position } from './position.model';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appMovable]'
})
export class MovableDirective extends DraggableDirective {
  private position: Position = new Position(0, 0);
  private startPosition: Position = this.position;

  // tslint:disable-next-line:no-input-rename
  @Input('appMovableReset') reset = true;
  @HostBinding('class.movable') movable = true;
  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  @HostListener('dragStart', ['$event']) onDragStart(event: PointerEvent) {
    this.startPosition = new Position(
      event.clientX - this.position.x,
      event.clientY - this.position.y
    );
  }
  @HostListener('dragMove', ['$event']) onDragMove(event: PointerEvent) {
    this.position = new Position(
      event.clientX - this.startPosition.x,
      event.clientY  - this.startPosition.y
    );
  }
  @HostListener('dragEnd', ['$event']) onDragEnd(event: PointerEvent) {
    if (this.reset) {
      this.position = new Position(0, 0);
    }
  }

}
