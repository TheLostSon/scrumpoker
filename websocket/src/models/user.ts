export type Card = {
  title?: string;
  icons?: string;
  sort?: number;
};

export type User = {
  name: string;
  groupName: string;
  card?: Card;
  cardEdited?: Card;
  sort: number;
};
