const express = require('express');
const { Filme } = require('../models/relacionamentos');

const router = express.Router();

// API consumida pelo frontend React.
router.get('/filmes', (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) return next();
    return res.status(401).json({ erro: 'Faça login para consultar os filmes.' });
}, async (req, res, next) => {
    try {
        const filmes = await Filme.findAll({ raw: true, order: [['id', 'DESC']] });
        res.json(filmes);
    } catch (erro) {
        console.error('Erro ao consultar filmes pela API:', erro);
        res.status(500).json({ erro: 'Erro ao consultar filmes' });
    }
});

module.exports = router;
