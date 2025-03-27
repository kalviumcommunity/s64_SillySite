const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sillysite', 'root', 'Hardik@456', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
