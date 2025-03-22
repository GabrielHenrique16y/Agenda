const loginModel = require('../models/LoginModel');

exports.Index = (req, res) => {
    if(req.session.user) res.render('logado')
    res.render('login');
}

exports.register = async(req, res) => {
    try {
        const login = new loginModel(req.body);
        await login.register();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('back');
            });
            return;
        }
    
        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(function() {
            return res.redirect('back');
        });
        } catch(e) {
        console.log(e);
        return res.render('404');
    }
}

exports.login = async(req, res) => {
    try {
        const login = new loginModel(req.body);
        await login.login();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('back');
            });
            return;
        }
    
        req.flash('success', 'Logado com sucesso');
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect('back');
        });
        } catch(e) {
        console.log(e);
        return res.render('404');
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}