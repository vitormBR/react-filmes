function autenticado(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) return next();
    return res.redirect('/login');
}

function naoAutenticado(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) return res.redirect('/');
    return next();
}

module.exports = { autenticado, naoAutenticado };
