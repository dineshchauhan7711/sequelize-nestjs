import { User } from './user.entity';

export const usersProviders = [
    {
        provide: 'User',
        useValue: User,
    },
];
