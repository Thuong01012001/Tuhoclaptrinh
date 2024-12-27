import { Sequelize } from 'sequelize';
import db from "../models/index.js";
import User from "../models/user.js";

const sequelize = new Sequelize('testnodejs', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
db.User = User(sequelize);
export default connectDB;
