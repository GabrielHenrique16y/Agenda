const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now } 
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body){
    this.body = body;
    this.errors = [];
    this.Contato = null;
}

Contato.prototype.register = async function(){
    this.valid();

    if(this.errors.length > 0) return;
    this.Contato = await ContatoModel.create(this.body);
}

Contato.prototype.valid = function(){
    this.cleanUp();


    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório');
    if(!this.body.email && !this.body.telefone) this.errors.push('Pelo menos um meio de contato deve ser enviado: e-mail ou telefone');
}

Contato.prototype.cleanUp = function(){
    for(const key in this.body){
        if(typeof this.body[key] !== 'string'){
            this.body[key] = '';
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    }
}

Contato.prototype.edit = async function(id) {
    if(typeof id !== 'string') return;
    this.valid();
    if(this.errors.length > 0) return;
    this.Contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new:true })
}

Contato.prototype.del = async function(id) {
    if(typeof id !== 'string') return;
    this.Contato = await ContatoModel.findByIdAndDelete(id)
}

Contato.buscaId = async function(id){
    if(typeof id !== 'string') return;
    const contatos = await ContatoModel.findById(id);
    return contatos;
}

Contato.buscaClientes = async function(){
    const contatos = await ContatoModel.find().sort({ criadoEm: -1 });
    return contatos;
}

module.exports = Contato