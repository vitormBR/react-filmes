require('dotenv').config();

const bcrypt = require('bcrypt');
const sequelize = require('./config/bd');
require('./models/relacionamentos');
const Usuario = require('./models/usuario.model');

async function criarUsuario() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });

        const email = 'admin@teste.com';
        const existente = await Usuario.findOne({ where: { email } });

        if (existente) {
            console.log('O usuário de demonstração já existe.');
            return;
        }

        const senhaHash = await bcrypt.hash('123456', 12);
        await Usuario.create({
            nome: 'Administrador',
            email,
            senha: senhaHash
        });

        console.log('Usuário criado para teste:');
        console.log('E-mail: admin@teste.com');
        console.log('Senha: 123456');
        console.log('Altere a senha antes de usar o sistema em qualquer ambiente real.');
    } catch (erro) {
        console.error('Não foi possível criar o usuário:', erro);
    } finally {
        await sequelize.close();
    }
}

criarUsuario();
