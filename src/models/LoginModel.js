const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const loginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', loginSchema);

class Login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login(){
        this.valid();
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });

        if(!this.user){
            this.errors.push('O usuário não existe.');
            return;
        }

        if(!bcrypt.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha ou usuário estão incorretos');
            this.user = null;
            return;
        }
    }

    async register(){
        this.valid();
        if(this.errors.length > 0) return;

        await this.userExists();

        if(this.errors.length > 0) return;

        const salt = bcrypt.genSaltSync();
        this.body.password = bcrypt.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    async userExists(){
        this.user = await LoginModel.findOne({ email: this.body.email });
        if(this.user) this.errors.push('Usuário já existe.');
    }

    valid(){
        this.cleanUp();


        if(!validator.isEmail(this.body.email)){
            this.errors.push('E-mail inválido.');
        }

        if(this.body.password.length < 3 || this.body.password.legth > 50) this.errors.push('A senha precisa ter entre 3 e 50 caracteres.')
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login;