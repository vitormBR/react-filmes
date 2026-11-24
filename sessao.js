const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

const sessionStore = new SQLiteStore({
    db: 'sessions.sqlite',
    dir: './',
    table: 'sessions'
});

function configurarSessao() {
    return session({
        name: 'sid',
        store: sessionStore,
        secret: process.env.SESSION_SECRET || 'chave-local-apenas-para-desenvolvimento',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        }
    });
}

module.exports = configurarSessao;
