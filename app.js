require('dotenv').config();

const express = require('express');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const cors = require('cors');
const passport = require('passport');
const sequelize = require('./config/bd');
const configurarSessao = require('./config/sessao');

// Carrega modelos e associações antes de sincronizar o banco.
require('./models/relacionamentos');
require('./models/usuario.model');

const app = express();

app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: './views/layouts'
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(configurarSessao());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use((req, res, next) => {
    res.locals.usuario = req.user || null;
    next();
});

app.use('/api', require('./routes/api'));
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/index'));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Ocorreu um erro no servidor. Verifique o terminal para mais detalhes.');
});

async function iniciar() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida.');
        await sequelize.sync({ alter: true });
        app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
    } catch (erro) {
        console.error('Erro ao iniciar a aplicação:', erro);
        process.exit(1);
    }
}

iniciar();
