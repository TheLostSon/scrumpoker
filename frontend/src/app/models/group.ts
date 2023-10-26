export type Group = {
  name: string;
  shortName: string;
  styleClass: {};
  sort: number;
  sortPoker: number;
  isModerator: boolean;
};

export const GROUPS: Array<Group> = [
  {
    name: 'Tech-Lead',
    shortName: 'TL',
    styleClass: { 'border-color': '#424242', 'background-color': '#FFFFFF' },
    sort: 5,
    sortPoker: 2,
    isModerator: false,
  },
  {
    name: 'Frontend',
    shortName: 'FE',
    styleClass: { 'border-color': '#009911', 'background-color': '#DEFBDE' },
    sort: 1,
    sortPoker: 3,
    isModerator: false,
  },
  {
    name: 'Backend',
    shortName: 'BE',
    styleClass: { 'border-color': '#BF002D', 'background-color': '#FFB4B4' },
    sort: 2,
    sortPoker: 4,
    isModerator: false,
  },
  {
    name: 'Fullstack',
    shortName: 'FS',
    styleClass: { 'border-color': '#EE7331', 'background-color': '#FFF4B1' },
    sort: 3,
    sortPoker: 5,
    isModerator: false,
  },
  {
    name: 'DevOps',
    shortName: 'Ops',
    styleClass: { 'border-color': '#2266BB', 'background-color': '#7799EE' },
    sort: 4,
    sortPoker: 6,
    isModerator: false,
  },
  {
    name: 'Auszubildende',
    shortName: 'Azubi',
    styleClass: { 'border-color': '#999999', 'background-color': '#EAEAEA' },
    sort: 7,
    sortPoker: 7,
    isModerator: false,
  },
  {
    name: 'Sonstige',
    shortName: '-',
    styleClass: { 'border-color': '#734273', 'background-color': '#D7A3D7' },
    sort: 99,
    sortPoker: 99,
    isModerator: false,
  },
  {
    name: 'Product-Owner',
    shortName: 'PO',
    styleClass: { 'border-color': '#424242', 'background-color': '#CCCCCC' },
    sort: 6,
    sortPoker: 1,
    isModerator: true,
  },
];

export function getGroup(name: string): Group | undefined {
  return GROUPS.find((group: Group): boolean => group.name === name);
}

export function isModerator(group: Group | undefined): boolean {
  return group ? group.isModerator : false;
}
