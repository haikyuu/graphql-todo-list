module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5431,
      user: "user",
      password: "password",
      database: "todolistdb"
    },
    migrations: {
      directory: "./api/db/migrations"
    },
    seeds: {
      directory: "./api/db/seeds"
    }
  }
};
