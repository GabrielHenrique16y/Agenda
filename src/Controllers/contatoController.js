const Contato = require('../models/contatoModel');

exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    });
};

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contato registrado com sucesso.');
        req.session.save(() =>
            res.redirect(`/`)
        );
        return;
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.editIndex = async function (req, res) {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.buscaId(req.params.id);
    if (!contato) return res.render('404');

    res.render('contato', { contato });
};

exports.edit = async function (req, res) {
    try {
        if (!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contato editado com sucesso.');
        req.session.save(() =>
            res.redirect(`/`)
        );
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};

exports.del = async(req, res) => {
    try {
        if (!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.del(req.params.id);

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contato Deletado com sucesso.');
        req.session.save(() =>
            res.redirect(`/`)
        );
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
}
