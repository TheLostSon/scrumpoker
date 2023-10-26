import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card, CARD_EMPTY } from '../../../models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card!: Card;
  @Input() hiddenState: boolean = false;
  @Input() selectable: boolean = false;
  @Input() isSelected: boolean = false;
  @Input() inactive?: 'inactive';

  @Output() selected: EventEmitter<Card> = new EventEmitter();

  protected readonly CARD_EMPTY: Card = CARD_EMPTY;

  onClick() {
    if (this.selectable) {
      this.selected.emit(this.card);
    }
  }
}
