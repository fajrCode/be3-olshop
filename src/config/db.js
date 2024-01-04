import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging:
      process.env.ENV === "development"
        ? (...msg) => console.log(msg[0])
        : false,
  }
);

try {
    sequelize.authenticate();
    console.log('Database is Connected...')
} catch (error) {
    console.log('Database is not Connected!!!')
}

export default sequelize;
