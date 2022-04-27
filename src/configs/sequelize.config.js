const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "d2q3u72j43bkdi",
  "spyhijwmmuwcvv",
  "12f16037088072a21915ed2274380f7f162e7a4f307da89150fdea9349691648",
  {
    dialect: "postgres",
    host: "ec2-3-218-171-44.compute-1.amazonaws.com",
    port: "5432",
  }
);

module.exports = sequelize;
