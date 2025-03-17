import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-clicable-span',
  templateUrl: './clicable-span.component.html',
  styleUrls: ['./clicable-span.component.css']
})
export class ClicableSpanComponent {

  @Output('clickListener') eventEmitter: EventEmitter<PointerEvent>;

  constructor() {
    this.eventEmitter = new EventEmitter<PointerEvent>(true);
  }

  onClick(pointerEvent: any) {
    this.eventEmitter.emit(pointerEvent);
  }

}
