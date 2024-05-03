import { Sequelize } from 'sequelize-typescript';
import { Config } from "../config/config";

// Models
import { User } from "../../module/users/user.entity";
import { UserSession } from "../../module/users/user_session.entity";

export const databaseProviders = [
     {
          provide: 'SEQUELIZE',
          useFactory: async () => {
               const sequelize = new Sequelize({
                    username: Config.database.username,
                    password: Config.database.password,
                    database: Config.database.database,
                    host: Config.database.host,
                    port: Config.database.port,
                    dialect: Config.database.dialect,
                    logging: false
               });
               sequelize.addModels([User, UserSession]);
               sequelize.authenticate()
                    .then(() => console.log('Connected to database!'))
                    .catch(err => console.log(err));

               await sequelize.sync({ alter: true });
               return sequelize;
          },
     },
];
