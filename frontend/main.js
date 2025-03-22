import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css'

const register_link = document.querySelector('.register_link');
const register_form = document.querySelector('.register-form');
const login_link = document.querySelector('.login_link');
const login_form = document.querySelector('.login-form');

register_link.addEventListener('click', () => {
    register_form.classList.add('form-active')
    login_form.classList.remove('form-active')
})

login_link.addEventListener('click', () => {
    login_form.classList.add('form-active')
    register_form.classList.remove('form-active')
})