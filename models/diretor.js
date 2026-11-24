const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const Diretor = sequelize.define('Diretor', {
    nome: { type: DataTypes.STRING, allowNull: false },
    foto: DataTypes.STRING,
    dataNascimento: DataTypes.DATEONLY,
    biografia: DataTypes.TEXT,
    nacionalidade: DataTypes.STRING
}, {
    tableName: 'Diretores',
    timestamps: true
});

module.exports = Diretor;
