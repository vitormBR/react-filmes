const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const Filme = sequelize.define('Filme', {
    titulo: { type: DataTypes.STRING, allowNull: false },
    ano: DataTypes.INTEGER,
    sinopse: DataTypes.TEXT,
    duracao: DataTypes.INTEGER,
    genero: DataTypes.STRING,
    clasIndicativa: DataTypes.INTEGER,
    paisOrigem: DataTypes.STRING,
    diretorId: DataTypes.INTEGER
}, {
    tableName: 'Filmes',
    timestamps: true
});

module.exports = Filme;
