export type Card = {
  sort: number;
  title?: string;
  icon?: string;
};

export const EMPTY_STATE: string = '-5';
export const EMPTY_STATE_NUMERIC: number = -5;
export const CARD_EMPTY: Card = { sort: -3, icon: 'horizontal_rule' };

export const CARDS: Array<Card> = [
  { sort: -2, icon: 'coffee' },
  { sort: -1, title: '?' },
  { sort: 0, title: '0' },
  { sort: 0.5, title: '0.5' },
  { sort: 1, title: '1' },
  { sort: 2, title: '2' },
  { sort: 3, title: '3' },
  { sort: 5, title: '5' },
  { sort: 8, title: '8' },
  { sort: 13, title: '13' },
  { sort: 20, title: '20' },
  { sort: 40, title: '40' },
];

export function GET_CARD(sort: number): Card | undefined {
  return CARDS.find((card: Card): boolean => card.sort === sort) || undefined;
}
