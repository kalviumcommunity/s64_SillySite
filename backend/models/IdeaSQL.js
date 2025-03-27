const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const UserSQL = require('./UserSQL');

const IdeaSQL = sequelize.define('Idea', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    upvotes: { type: DataTypes.INTEGER, defaultValue: 0 },
    downvotes: { type: DataTypes.INTEGER, defaultValue: 0 }
    created_by: { 
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserSQL,
            key: 'id',
        },
    },
}, {
    timestamps: true
});

IdeaSQL.belongsTo(UserSQL, { foreignKey: 'userId' });
UserSQL.hasMany(IdeaSQL, { foreignKey: 'created_by' });
IdeaSQL.belongsTo(UserSQL, { foreignKey: 'created_by' });

module.exports = IdeaSQL;
