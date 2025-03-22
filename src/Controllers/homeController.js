const contato = require('../models/contatoModel')

exports.Index = async(req, res) => {
    const contatos = await contato.buscaClientes()
    res.render('index', { contatos })
}