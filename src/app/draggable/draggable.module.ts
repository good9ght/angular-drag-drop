import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { MovableDirective } from './movable.directive';
import { MovableAreaDirective } from './movable-area.directive';
import { DraggableHelperDirective } from './draggable-helper.directive';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [DraggableDirective, MovableDirective, MovableAreaDirective, DraggableHelperDirective],
  exports: [DraggableDirective, MovableDirective, MovableAreaDirective, DraggableHelperDirective]
})
export class DraggableModule { }
