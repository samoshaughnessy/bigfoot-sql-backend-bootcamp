require("dotenv").config();

module.exports = {
  development: {
    username: "postgres",
    password: null,
    database: "bigfoot_app_development",
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
