const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const FichaTecnica = sequelize.define('FichaTecnica', {
    filmeId: { type: DataTypes.INTEGER, allowNull: false },
    roteirista: DataTypes.STRING,
    produtor: DataTypes.STRING,
    compositor: DataTypes.STRING,
    editor: DataTypes.STRING,
    duracao: DataTypes.INTEGER,
    orcamento: DataTypes.DECIMAL(12, 2)
}, {
    tableName: 'FichaTecnicas',
    timestamps: true
});

module.exports = FichaTecnica;
