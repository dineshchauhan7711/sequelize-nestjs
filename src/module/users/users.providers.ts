import { User } from './user.entity';
import { UserSession } from "./user_session.entity";
export const usersProviders = [
    {
        provide: 'User',
        useValue: User,
    },
    {
        provide: 'UserSession',
        useValue: UserSession,
    },
];
