const Sequelize = require("sequelize");

const sequelize = new Sequelize(
   'groupomania',
   'DATABASE_USERNAME',
   'DATABASE_PASSWORD',
    {
      host: 'DATABASE_HOST',
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});