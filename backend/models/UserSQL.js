const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysqlDb');

const UserSQL = sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: true
});

module.exports = UserSQL;
