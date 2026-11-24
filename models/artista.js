const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const Artista = sequelize.define('Artista', {
    nome: { type: DataTypes.STRING, allowNull: false },
    nacionalidade: DataTypes.STRING,
    dataNascimento: DataTypes.DATEONLY,
    biografia: DataTypes.TEXT,
    tipo: DataTypes.STRING,
    papeis: DataTypes.STRING
}, {
    tableName: 'Artistas',
    timestamps: true
});

module.exports = Artista;
