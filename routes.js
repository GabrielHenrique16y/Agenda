const express = require('express');
const route = express.Router();
const homeController = require('./src/Controllers/homeController');
const loginController = require('./src/Controllers/loginController');
const contatoController = require('./src/Controllers/contatoController');

const { loginrequired } = require('./src/middlewares/middlewares')

route.get('/', loginrequired, homeController.Index);

route.get('/login', loginController.Index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

route.get('/contato', loginrequired, contatoController.index);
route.post('/contato/register', loginrequired, contatoController.register);
route.get('/contato/:id', loginrequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginrequired, contatoController.edit);
route.get('/contato/del/:id', loginrequired, contatoController.del);


module.exports = route;
