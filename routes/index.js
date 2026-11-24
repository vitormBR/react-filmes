const express = require('express');
const { Op } = require('sequelize');
const { autenticado } = require('../middlewares/auth');
const { Filme, Diretor, Artista, FichaTecnica } = require('../models/relacionamentos');

const router = express.Router();

router.use(autenticado);

router.get('/', (req, res) => res.render('home', { usuario: req.user }));

// FILMES
router.get('/filmes', async (req, res, next) => {
    try {
        const filmes = await Filme.findAll({ include: [{ model: Diretor, as: 'diretor' }], order: [['id', 'DESC']] });
        res.render('filmes/index', { filmes });
    } catch (e) { next(e); }
});

router.get('/filmes/cadastrar', async (req, res, next) => {
    try {
        const diretores = await Diretor.findAll();
        const artistas = await Artista.findAll();
        res.render('filmes/cadastrar', { diretores, artistas });
    } catch (e) { next(e); }
});

router.post('/filmes', async (req, res, next) => {
    try {
        const { artistas, ...dados } = req.body;
        const filme = await Filme.create({ ...dados, diretorId: dados.diretorId || null });
        if (artistas) await filme.setArtistas(Array.isArray(artistas) ? artistas : [artistas]);
        res.redirect('/filmes');
    } catch (e) { next(e); }
});

router.get('/filmes/:id', async (req, res, next) => {
    try {
        const filme = await Filme.findByPk(req.params.id, {
            include: [
                { model: Diretor, as: 'diretor' },
                { model: FichaTecnica, as: 'fichaTecnica' },
                { model: Artista, as: 'artistas' }
            ]
        });
        if (!filme) return res.status(404).send('Filme não encontrado.');
        res.render('filmes/detalhes', { filme });
    } catch (e) { next(e); }
});

// FICHA TÉCNICA
router.get('/ficha-tecnica', async (req, res, next) => {
    try {
        const fichasTecnicas = await FichaTecnica.findAll({
            include: [{ model: Filme, as: 'filme' }],
            order: [['id', 'DESC']]
        });
        res.render('fichaTecnica/index', { fichasTecnicas });
    } catch (e) { next(e); }
});

router.get('/ficha-tecnica/cadastrar', async (req, res, next) => {
    try {
        const filmes = await Filme.findAll();
        res.render('fichaTecnica/cadastrar', { filmes });
    } catch (e) { next(e); }
});

router.post('/ficha-tecnica', async (req, res, next) => {
    try {
        await FichaTecnica.create(req.body);
        res.redirect('/ficha-tecnica');
    } catch (e) { next(e); }
});

router.get('/ficha-tecnica/:id', async (req, res, next) => {
    try {
        const ficha = await FichaTecnica.findByPk(req.params.id, { include: [{ model: Filme, as: 'filme' }] });
        if (!ficha) return res.status(404).send('Ficha técnica não encontrada.');
        res.render('fichaTecnica/detalhes', { ficha });
    } catch (e) { next(e); }
});

// DIRETORES
router.get('/diretores', async (req, res, next) => {
    try {
        const diretores = await Diretor.findAll({ order: [['id', 'DESC']] });
        res.render('diretores/index', { diretores });
    } catch (e) { next(e); }
});

router.get('/diretores/cadastrar', (req, res) => res.render('diretores/cadastrar'));

router.post('/diretores', async (req, res, next) => {
    try {
        await Diretor.create(req.body);
        res.redirect('/diretores');
    } catch (e) { next(e); }
});

router.get('/diretores/:id', async (req, res, next) => {
    try {
        const diretor = await Diretor.findByPk(req.params.id, { include: [{ model: Filme, as: 'filmes' }] });
        if (!diretor) return res.status(404).send('Diretor não encontrado.');
        res.render('diretores/detalhes', { diretor });
    } catch (e) { next(e); }
});

// ARTISTAS
router.get('/artistas', async (req, res, next) => {
    try {
        const artistas = await Artista.findAll({ order: [['id', 'DESC']] });
        res.render('artistas/index', { artistas });
    } catch (e) { next(e); }
});

router.get('/artistas/cadastrar', (req, res) => res.render('artistas/cadastrar'));

router.post('/artistas', async (req, res, next) => {
    try {
        await Artista.create(req.body);
        res.redirect('/artistas');
    } catch (e) { next(e); }
});

router.get('/artistas/:id', async (req, res, next) => {
    try {
        const artista = await Artista.findByPk(req.params.id, { include: [{ model: Filme, as: 'filmes' }] });
        if (!artista) return res.status(404).send('Artista não encontrado.');
        res.render('artistas/detalhes', { artista });
    } catch (e) { next(e); }
});

module.exports = router;
