import IUser from '../models/user/types/user.type';

const dummies: IUser[] = [
  {
    id: '1',
    email: 'generalkenobi@troll.net',
    password: 'hellothere',
    firstName: 'Obiwan',
    lastName: 'Kenobi',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// eslint-disable-next-line import/prefer-default-export
export { dummies };
