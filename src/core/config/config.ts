import 'dotenv/config';

export const Config: any = {
     port: process.env.PORT || 3000,
     database: {
          username: process.env.DB_USER || 'root',
          password: process.env.DB_PASS || '',
          database: process.env.DB_NAME || 'sequelize_nestjs',
          host: process.env.DB_HOST || 'localhost',
          port: process.env.DB_PORT || '3306',
          dialect: process.env.DB_DIALECT || 'mysql',
     },
     jwtSecretKey: process.env.JWT_SECRET_KEY || 'SA4DS8FS78F4F5SFF56DF4D5SS5E',
};
