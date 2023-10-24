import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card, CARDS } from '../../../models/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  protected readonly CARDS: Array<Card> = CARDS;
  @Output() select: EventEmitter<Card> = new EventEmitter();
  @Input() selectedCard?: Card | undefined;

  onCardSelected(card: Card): void {
    this.selectedCard = card;
    this.select.emit(card);
  }
}
