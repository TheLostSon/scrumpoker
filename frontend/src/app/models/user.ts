import { Card } from './card';

export type User = {
  name: string;
  groupName: string;
  card?: Card;
  cardEdited?: Card;
  sort: number;
};


