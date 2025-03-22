exports.globalMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

// eslint-disable-next-line no-unused-vars
exports.checkCsrfError = (err, req, res, next) => {
    if (err && 'EBADCSRFTOKEN' === err.code) {
        return res.render('./Erro404');
    }
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginrequired = (req, res, next) => {
    if(!req.session.user){
        req.flash('errors', 'você precisa fazer login');
        req.session.save(() => res.redirect('/login'));
        return;
    }

    next();
}
