require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: null,
    database: process.env.DB_DATABASE,
    host: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: null,
    database: process.env.DB_DATABASE,
    host: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
