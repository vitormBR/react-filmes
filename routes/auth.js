const express = require('express');
const passport = require('passport');
const { naoAutenticado } = require('../middlewares/auth');

const router = express.Router();

router.get('/login', naoAutenticado, (req, res) => {
    res.render('usuarios/login', {
        layout: 'main',
        erro: req.query.erro === '1'
    });
});

router.post('/login', naoAutenticado, (req, res, next) => {
    passport.authenticate('local', (erro, usuario) => {
        if (erro) return next(erro);
        if (!usuario) return res.redirect('/login?erro=1');

        req.logIn(usuario, (erroLogin) => {
            if (erroLogin) return next(erroLogin);
            return res.redirect('/');
        });
    })(req, res, next);
});

router.post('/logout', (req, res, next) => {
    req.logout((erro) => {
        if (erro) return next(erro);
        req.session.destroy((erroSessao) => {
            if (erroSessao) return next(erroSessao);
            res.clearCookie('sid');
            res.redirect('/login');
        });
    });
});

module.exports = router;
