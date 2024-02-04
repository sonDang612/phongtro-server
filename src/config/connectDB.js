const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("phongtro123", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.log("Unable to connect to the database: ", error);
  }
};

export default connectDB;
