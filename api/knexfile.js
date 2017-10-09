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
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  }
};
