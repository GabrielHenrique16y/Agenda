//dotenv é refente as minhas variaveis de desenvolvimento
require('dotenv').config();

//a importação do express
const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const csrf = require('csurf');
//recomendado que esteja desativado durante o desenvolvimento
// const helmet = require('helmet');
const { globalMiddleware, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middlewares');

//conexão com o MongoDB
const MongoStore = require('connect-mongo');

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING).then(() => {
    console.log('Conectado ao BD');
    app.emit('bdPronto');
});

//Para salvar as sessões do cliente
const session = require('express-session');
const flash = require('connect-flash');

const sessionOptions = session({
    secret: 'GB7344',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

// app.use(helmet());


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//Para segurança da aplicação
app.use(csrf())

//Uso das middlewares
app.use(globalMiddleware);
app.use(checkCsrfError);
app.use(csrfMiddleware);

//As rotas da aplicação
app.use(routes);

app.on('bdPronto', () => {
    app.listen(5500, () => {
        console.log('O servidor está aberto na porta 5500');
        console.log('acesse http://127.0.0.1:5500');
    });
});
