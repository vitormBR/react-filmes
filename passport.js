const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario.model');

module.exports = function configurarPassport(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha'
    }, async (email, senha, done) => {
        try {
            const usuario = await Usuario.findOne({ where: { email } });
            if (!usuario) return done(null, false, { message: 'E-mail ou senha inválidos.' });

            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) return done(null, false, { message: 'E-mail ou senha inválidos.' });

            return done(null, usuario);
        } catch (erro) {
            return done(erro);
        }
    }));

    passport.serializeUser((usuario, done) => done(null, usuario.id));

    passport.deserializeUser(async (id, done) => {
        try {
            const usuario = await Usuario.findByPk(id);
            done(null, usuario || false);
        } catch (erro) {
            done(erro);
        }
    });
};
